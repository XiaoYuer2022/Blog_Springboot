package com.ican.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * QQ配置属性
 *
 * @author ican
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "oauth.qq")
public class QqProperties {

    /**
     * QQ appId
     */
    private String appId;

    /**
     * QQ app key
     */
    private String appKey;

    /**
     * grant-type  就是：authorization_code
     */
    private String grantType;

    /**
     * QQ回调域名
     */
    private String redirectUrl;

    /**
     * QQ访问令牌地址 (没用到)
     */
    private String accessTokenUrl;

    /**
     * QQ用户信息地址 (没用到)
     */
    private String userOpenIdUrl;

    /**
     * QQ用户信息地址 (没用到)
     */
    private String userInfoUrl;

    /**
     * QQ用户信息地址 (没用到)
     */
    private String checkTokenUrl;
}
