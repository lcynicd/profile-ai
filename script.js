/* ===========================================
   合规 × AI 个人主页交互脚本
   - 时间线节点切换
   - Skill 三视图 Tab / 下拉切换
   - 滚动渐入动画
   =========================================== */

(function () {
  'use strict';

  /* -------------------------------------------
     1. 时间线节点切换
     ------------------------------------------- */
  function initTimeline() {
    var timeline = document.querySelector('[data-component="timeline"]');
    if (!timeline) return;

    var nodes = timeline.querySelectorAll('.timeline-node');
    var contents = document.querySelectorAll('[data-stage-content]');

    nodes.forEach(function (node) {
      node.addEventListener('click', function () {
        var stage = node.getAttribute('data-stage');

        // 更新节点状态
        nodes.forEach(function (n) { n.classList.remove('active'); });
        node.classList.add('active');

        // 切换内容
        contents.forEach(function (c) {
          if (c.getAttribute('data-stage-content') === stage) {
            c.hidden = false;
          } else {
            c.hidden = true;
          }
        });
      });
    });
  }

  /* -------------------------------------------
     2. Skill 三视图 Tab 切换（桌面端）
     ------------------------------------------- */
  function initTabs() {
    var tabsContainer = document.querySelector('[data-component="tabs"]');
    if (!tabsContainer) return;

    var tabs = tabsContainer.querySelectorAll('.tab');
    var panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var name = tab.getAttribute('data-tab');
        switchPanel(name, tabs, panels);
        // 同步移动端下拉
        var sel = document.querySelector('[data-component="tabs-select"]');
        if (sel) sel.value = name;
      });
    });
  }

  /* -------------------------------------------
     3. Skill 三视图下拉切换（移动端）
     ------------------------------------------- */
  function initTabsSelect() {
    var select = document.querySelector('[data-component="tabs-select"]');
    if (!select) return;

    var tabsContainer = document.querySelector('[data-component="tabs"]');
    var tabs = tabsContainer ? tabsContainer.querySelectorAll('.tab') : [];
    var panels = document.querySelectorAll('.tab-panel');

    select.addEventListener('change', function () {
      var name = select.value;
      switchPanel(name, tabs, panels);
    });
  }

  function switchPanel(name, tabs, panels) {
    tabs.forEach(function (t) {
      if (t.getAttribute('data-tab') === name) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    panels.forEach(function (p) {
      if (p.getAttribute('data-panel') === name) {
        p.hidden = false;
        p.classList.add('active');
      } else {
        p.hidden = true;
        p.classList.remove('active');
      }
    });
  }

  /* -------------------------------------------
     4. 滚动渐入动画（IntersectionObserver）
     ------------------------------------------- */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // 旧浏览器降级：直接显示所有元素
      var fallback = '.section, .act-block, .method-card, .article-card, .stage-card, .round-item, .innov-block, .check-item';
      document.querySelectorAll(fallback).forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -10% 0px'
    });
    window._scrollObserver = observer;

    var selector = '.section, .act-block, .method-card, .article-card, .stage-card, .round-item, .innov-block, .check-item';
    document.querySelectorAll(selector).forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -------------------------------------------
     启动
     ------------------------------------------- */
  function init() {
    initTimeline();
    initTabs();
    initTabsSelect();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
