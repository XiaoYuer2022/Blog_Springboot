package com.ican.strategy.impl;

import com.alibaba.fastjson2.JSON;
import com.ican.config.properties.QqProperties;
import com.ican.enums.LoginTypeEnum;
import com.ican.exception.ServiceException;
import com.ican.model.vo.QqUserInfoVO;
import com.ican.model.vo.SocialTokenVO;
import com.ican.model.vo.SocialUserInfoVO;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static com.ican.constant.SocialLoginConstant.*;

//以下为我的新增
import com.ican.model.dto.CodeDTO;
import com.ican.model.vo.TokenVO;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.apache.http.client.methods.HttpGet;
import com.alibaba.fastjson2.JSONObject;
/**
* Qq登录策略
*
* @author ican
* @date 2023/04/06 18:43
**/
@Service("qqLoginStrategyImpl")
public class QqLoginStrategyImpl extends AbstractLoginStrategyImpl {
//    private static final Logger logger = LoggerFactory.getLogger(QqLoginStrategyImpl.class);

    @Autowired
    private QqProperties qqProperties;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public SocialTokenVO getSocialToken(CodeDTO codeDTO) {
        // 获取Qq的Token
        TokenVO qqToken = getQqToken(codeDTO.getCode());
        System.out.println("后端收到的access_token为："+qqToken.getAccess_token());
        //logger.error("后端收到的access_token_2为："+qqToken.getAccess_token());
        // 获取用户OpenId
        String userOpenId = getUserOpenId(qqToken.getAccess_token());
        //logger.error("后端收到的openid为："+userOpenId);
        // 返回token信息
        return SocialTokenVO.builder()
                .openId(userOpenId)
                .accessToken(qqToken.getAccess_token())
                .loginType(LoginTypeEnum.QQ.getLoginType())
                .build();
    }

    @Override
    public SocialUserInfoVO getSocialUserInfo(SocialTokenVO socialToken) {
        // 定义请求参数
        Map<String, String> formData = new HashMap<>(3);
        formData.put(ACCESS_TOKEN, socialToken.getAccessToken());
        formData.put(OAUTH_CONSUMER_KEY, qqProperties.getAppId());
        formData.put(QQ_OPEN_ID, socialToken.getOpenId());
        // 获取QQ返回的用户信息
        QqUserInfoVO qqUserInfo = JSON.parseObject(restTemplate.getForObject(qqProperties.getUserInfoUrl(), String.class, formData), QqUserInfoVO.class);
        // System.out.println("头像链接为:"+qqUserInfo.getFigureurl_qq());
        // 返回用户信息
        return SocialUserInfoVO.builder()
                .id(socialToken.getOpenId())
                .nickname(Objects.requireNonNull(qqUserInfo).getNickname())
                .avatar(qqUserInfo.getFigureurl_qq())
                .build();
    }

    /**
     * 获取QQ的Token
     *
     * @param code 第三方code
     * @return {@link TokenVO} QQ的Token
     */
    public TokenVO getQqToken(String code) {
          String getQqAccessTokenUrl = "https://graph.qq.com/oauth2.0/token?grant_type="+qqProperties.getGrantType()
          + "&client_id="+qqProperties.getAppId()+"&client_secret="+qqProperties.getAppKey()+"&code="+code+"&redirect_uri="+qqProperties.getRedirectUrl();
          //logger.error("后端发送url来申请access_token为："+getQqAccessTokenUrl);

        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(getQqAccessTokenUrl);
            CloseableHttpResponse response = client.execute(httpGet);

            org.apache.http.HttpEntity entity = response.getEntity();
            byte[] bytes = EntityUtils.toByteArray(entity);
            String str = new String(bytes, "utf-8");
            //logger.error("access_token的回复为："+str);
            String[] split = str.split("&");
            String[] split1 = split[0].split("=");
            response.close();
            TokenVO tokenVO = new TokenVO();
            //logger.error("access_token为："+split1[1]);

            tokenVO.setAccess_token(split1[1]);  // 设置 access_token 属性
            return tokenVO;  // 返回 TokenVO 对象
        } catch (Exception e) {
            throw new ServiceException("qq登录错误,access_token获取失败:"+e);
        }
    }
//  https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=102053757&client_secret=GRQBl9JH1XpuoVyD&code=xxx&redirect_uri=https://haoxx.site/oauth/login/qq
    /**
     * 获取用户的OpenId
     *
     * @return 用户的OpenId
     */
    private String getUserOpenId(String accessToken) {
        Map<String, String> dataMap = new HashMap<>(2);
        // 请求参数
        dataMap.put(ACCESS_TOKEN, accessToken);
        dataMap.put(FMT, "json");
        String getQqOpenIdUrl = "https://graph.qq.com/oauth2.0/me?access_token="+accessToken
                + "&fmt="+"json";
        // 返回用户OpenId
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(getQqOpenIdUrl);
            CloseableHttpResponse response = client.execute(httpGet);

            org.apache.http.HttpEntity entity = response.getEntity();
            byte[] bytes = EntityUtils.toByteArray(entity);
            String jsonResponse = new String(bytes, StandardCharsets.UTF_8);

            // 使用 fastjson 解析 JSON
            JSONObject jsonObject = JSON.parseObject(jsonResponse);

            // 提取 openid 值
            String openid = jsonObject.getString("openid");
            //logger.error("openid为："+openid);
            // 返回 openid
            return openid;
        } catch (Exception e) {
            throw new ServiceException("qq登录错误,openid获取失败:"+e);
        }
    }
}



