-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2015 年 08 月 19 日 02:50
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `test`
--

-- --------------------------------------------------------

--
-- 表的结构 `yoyashared`
--

CREATE TABLE IF NOT EXISTS `yoyashared` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(100) NOT NULL default '' COMMENT '标题',
  `url` varchar(300) default NULL COMMENT '网址',
  `nick` varchar(50) default NULL COMMENT '昵称',
  `time` date default NULL COMMENT '时间',
  PRIMARY KEY  (`id`,`title`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 导出表中的数据 `yoyashared`
--

INSERT INTO `yoyashared` (`id`, `title`, `url`, `nick`, `time`) VALUES
(2, '前端开发必备！Emmet使用手册 | css3教程-css3实例-css3动画 | W3CPlus', 'http://www.w3cplus.com/tools/emmet-cheat-sheet.html', '"Rookie_wan"', '2015-08-19'),
(3, 'CSS3选择非第一个子元素 | Hainter | Hacker Meets Painter', 'http://www.hainter.com/css3-not-first-child', '"Rookie_wan"', '2015-08-19'),
(4, '已安装扩展', 'chrome://myextensions/extensions', '"Rookie_wan"', '2015-08-19'),
(5, '华侨大学吧_百度贴吧', 'http://tieba.baidu.com/f?kw=%BB%AA%C7%C8%B4%F3%D1%A7', '"Rookie_wan"', '2015-08-19'),
(6, '地下城与勇士吧_百度贴吧', 'http://tieba.baidu.com/f?kw=%B5%D8%CF%C2%B3%C7%D3%EB%D3%C2%CA%BF', '"Rookie_wan"', '2015-08-19'),
(7, 'minecraft吧_百度贴吧', 'http://tieba.baidu.com/f?kw=minecraft', '"Rookie_wan"', '2015-08-19'),
(8, 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ', 'http://www.acfun.tv/', '"Rookie_wan"', '2015-08-19'),
(9, '华侨大学教务处信息管理系统', 'http://jwc.hqu.edu.cn/', '"Rookie_wan"', '2015-08-19'),
(11, '京东(JD.COM)-综合网购首选-正品低价、品质保障、配送及时、轻松购物！', 'http://www.jd.com//?cu=true&utm_source=vip.baidu.com&utm_medium=tuiguang&utm_campaign=t_298046589_&utm_term=92a5960b0b884cd6b73236bfa7d4547e', '"Rookie_wan"', '2015-08-19');
