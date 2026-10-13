/* ==========================================================================
   社会学课程工作区 — 测验组件
   共享于所有课程。用法见文件底部注释。

   设计约束（来自 SKILL.md）：
   - 各选项字数应尽量一致，不给用户格式线索。
   - 反馈必须即时且自动，形成闭环。
   - 答错后应能重试，让用户把正确答案真正取回一次
     （retrieval practice：错误后的成功提取比一次答对更能巩固记忆）。
   ========================================================================== */

(function () {
  "use strict";

  function initQuiz(quiz) {
    var buttons = Array.prototype.slice.call(quiz.querySelectorAll("button.opt"));
    var feedback = quiz.querySelector(".feedback");
    var verdict = quiz.querySelector(".verdict");
    var explain = quiz.querySelector(".explain");
    var solved = false;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (solved || btn.disabled) return;

        if (btn.dataset.correct === "true") {
          solved = true;
          btn.classList.add("correct");
          buttons.forEach(function (b) { b.disabled = true; });
          if (verdict) {
            verdict.textContent = "对";
            verdict.className = "verdict ok";
          }
        } else {
          btn.classList.add("wrong");
          btn.disabled = true;
          if (verdict) {
            verdict.textContent = "再看一次";
            verdict.className = "verdict bad";
          }
        }

        if (explain) explain.style.display = "block";
        if (feedback) feedback.classList.add("show");
      });
    });
  }

  function boot() {
    var quizzes = document.querySelectorAll(".quiz");
    Array.prototype.forEach.call(quizzes, initQuiz);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

/* --------------------------------------------------------------------------
   用法

   <div class="quiz">
     <p class="q"><span class="q-num">第 1 题</span>题干文字？</p>
     <div class="options">
       <button class="opt" data-correct="true">正确选项</button>
       <button class="opt">干扰项一</button>
       <button class="opt">干扰项二</button>
     </div>
     <p class="feedback">
       <span class="verdict"></span>
       <span class="explain">解析文字，说明为什么。</span>
     </p>
   </div>

   注意：解析文本放在 .explain 里，仅在用户点击后显示，
   避免答案被提前读到。
   -------------------------------------------------------------------------- */
