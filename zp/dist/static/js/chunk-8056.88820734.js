(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8056"],{"/J+n":function(e,a,t){},"7lXG":function(e,a,t){"use strict";t.r(a);var n={name:"userManage",data:function(){return{activeName:"user"}},methods:{handleClick:function(e,a){this.activeName=e.name,this.$router.push("/businessManage/index/"+e.name)}}},i=(t("z8EE"),t("ZrdR")),s=Object(i.a)(n,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"userManage"}},[t("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"用户列表",name:"user"}})],1),e._v(" "),t("div",{staticClass:"tbl-content"},[t("router-view")],1)],1)},[],!1,null,"6ba76f6e",null);s.options.__file="index.vue";a.default=s.exports},z8EE:function(e,a,t){"use strict";var n=t("/J+n");t.n(n).a}}]);