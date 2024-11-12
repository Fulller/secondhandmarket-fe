function Profile() {
  return (
    <div>
      2024-11-12T11:20:27.997+07:00 INFO 9868 --- [secondhandmarket] [ main]
      org.hibernate.Version : HHH000412: Hibernate ORM core version 6.5.2.Final
      2024-11-12T11:20:28.103+07:00 INFO 9868 --- [secondhandmarket] [ main]
      o.h.c.internal.RegionFactoryInitiator : HHH000026: Second-level cache
      disabled 2024-11-12T11:20:28.944+07:00 INFO 9868 --- [secondhandmarket] [
      main] o.s.o.j.p.SpringPersistenceUnitInfo : No LoadTimeWeaver setup:
      ignoring JPA class transformer 2024-11-12T11:20:28.994+07:00 INFO 9868 ---
      [secondhandmarket] [ main] com.zaxxer.hikari.HikariDataSource :
      HikariPool-1 - Starting... 2024-11-12T11:20:32.407+07:00 INFO 9868 ---
      [secondhandmarket] [ main] com.zaxxer.hikari.pool.HikariPool :
      HikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@7030b74c
      2024-11-12T11:20:32.411+07:00 INFO 9868 --- [secondhandmarket] [ main]
      com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Start completed.
      2024-11-12T11:20:35.054+07:00 INFO 9868 --- [secondhandmarket] [ main]
      o.h.e.t.j.p.i.JtaPlatformInitiator : HHH000489: No JTA platform available
      (set 'hibernate.transaction.jta.platform' to enable JTA platform
      integration) Hibernate: alter table product modify column description
      varchar(255) not null 2024-11-12T11:20:49.125+07:00 INFO 9868 ---
      [secondhandmarket] [ main] j.LocalContainerEntityManagerFactoryBean :
      Initialized JPA EntityManagerFactory for persistence unit 'default'
      2024-11-12T11:20:50.495+07:00 INFO 9868 --- [secondhandmarket] [ main]
      o.s.d.j.r.query.QueryEnhancerFactory : Hibernate is in classpath; If
      applicable, HQL parser will be used. 2024-11-12T11:20:52.868+07:00 WARN
      9868 --- [secondhandmarket] [ main]
      JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is
      enabled by default. Therefore, database queries may be performed during
      view rendering. Explicitly configure spring.jpa.open-in-view to disable
      this warning 2024-11-12T11:20:53.159+07:00 INFO 9868 ---
      [secondhandmarket] [ main] eAuthenticationProviderManagerConfigurer :
      Global AuthenticationManager configured with AuthenticationProvider bean
      with name authenticationProvider 2024-11-12T11:20:53.161+07:00 WARN 9868
      --- [secondhandmarket] [ main] r$InitializeUserDetailsManagerConfigurer :
      Global AuthenticationManager configured with an AuthenticationProvider
      bean. UserDetailsService beans will not be used for username/password
      login. Consider removing the AuthenticationProvider bean. Alternatively,
      consider using the UserDetailsService in a manually instantiated
      DaoAuthenticationProvider. 2024-11-12T11:20:56.269+07:00 INFO 9868 ---
      [secondhandmarket] [ main] o.s.b.w.embedded.tomcat.TomcatWebServer :
      Tomcat started on port 8080 (http) with context path '/'
      2024-11-12T11:20:56.316+07:00 INFO 9868 --- [secondhandmarket] [ main]
      c.s.SecondhandmarketApplication : Started SecondhandmarketApplication in
      36.754 seconds (process running for 37.948) Hibernate: select u1_0.id from
      user u1_0 where u1_0.email=? and not(u1_0.is_from_outside) limit ?
      2024-11-12T11:49:14.459+07:00 INFO 9868 --- [secondhandmarket]
      [nio-8080-exec-2] o.a.c.c.C.[Tomcat].[localhost].[/] : Initializing Spring
      DispatcherServlet 'dispatcherServlet' 2024-11-12T11:49:14.464+07:00 INFO
      9868 --- [secondhandmarket] [nio-8080-exec-2]
      o.s.web.servlet.DispatcherServlet : Initializing Servlet
      'dispatcherServlet' 2024-11-12T11:49:14.586+07:00 INFO 9868 ---
      [secondhandmarket] [nio-8080-exec-2] o.s.web.servlet.DispatcherServlet :
      Completed initialization in 121 ms Hibernate: select
      rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where rt1_0.user_id=?
      Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where
      rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id
      from category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      2024-11-12T13:40:57.916+07:00 WARN 9868 --- [secondhandmarket] [l-1
      housekeeper] com.zaxxer.hikari.pool.HikariPool : HikariPool-1 - Thread
      starvation or clock leap detected (housekeeper
      delta=1h14m23s972ms701µs100ns). 2024-11-12T13:42:51.291+07:00 WARN 9868
      --- [secondhandmarket] [nio-8080-exec-6] o.a.c.util.SessionIdGeneratorBase
      : Creation of SecureRandom instance for session ID generation using
      [SHA1PRNG] took [321] milliseconds. Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating
      from user u1_0 where u1_0.is_from_outside and u1_0.provider_name=? and
      u1_0.provider_id=? Hibernate: select r1_0.user_id,r1_0.role from
      user_roles r1_0 where r1_0.user_id=? Hibernate: select
      rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where rt1_0.user_id=?
      Hibernate: update refresh_token set token=? where user_id=? Hibernate:
      select rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where
      rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token from
      refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where rt1_0.user_id=?
      Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where
      rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where rt1_0.user_id=?
      Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where
      rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id
      from category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where
      rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token from
      refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select rt1_0.user_id,rt1_0.token from refresh_token
      rt1_0 where rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token
      from refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id
      from category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0
      Hibernate: select c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from
      category c1_0 Hibernate: select
      c1_0.id,c1_0.level,c1_0.name,c1_0.parent_id from category c1_0 Hibernate:
      select rt1_0.user_id,rt1_0.token from refresh_token rt1_0 where
      rt1_0.user_id=? Hibernate: select rt1_0.user_id,rt1_0.token from
      refresh_token rt1_0 where rt1_0.user_id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=? Hibernate: select
      u1_0.id,u1_0.address_id,u1_0.avatar,u1_0.email,u1_0.is_from_outside,u1_0.name,u1_0.password,u1_0.phone,u1_0.provider_id,u1_0.provider_name,u1_0.rating,r1_0.user_id,r1_0.role
      from user u1_0 left join user_roles r1_0 on u1_0.id=r1_0.user_id where
      u1_0.id=?
    </div>
  );
}

export default Profile;
