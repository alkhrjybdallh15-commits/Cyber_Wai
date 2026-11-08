
/* =====================================
   أولاً: فحص قوة كلمة المرور
===================================== */

function checkStrength() {

  const passwordInput = document.getElementById("passwordInput");
  const strengthBar = document.getElementById("strengthBar");
  const strengthMessage = document.getElementById("strengthMessage");

  if (!passwordInput || !strengthBar || !strengthMessage) {
    return;
  }

  const password = passwordInput.value;

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let percentage = (score / 6) * 100;

  strengthBar.style.width = percentage + "%";

  if (password.length === 0) {

    strengthBar.style.width = "0%";
    strengthBar.className = "progress-bar";
    strengthMessage.textContent = "أدخل كلمة المرور للفحص";

  } else if (score <= 2) {

    strengthBar.className = "progress-bar bg-danger";
    strengthMessage.textContent = "كلمة المرور ضعيفة ❌";

  } else if (score <= 4) {

    strengthBar.className = "progress-bar bg-warning";
    strengthMessage.textContent = "كلمة المرور متوسطة ⚠️";

  } else {

    strengthBar.className = "progress-bar bg-success";
    strengthMessage.textContent = "كلمة المرور قوية ✅";

  }

}


/* =====================================
   ثانياً: أسئلة اختبار الاحتيال
===================================== */

const quizQuestions = [

  {
    q: "إذا اتصل شخص وطلب الرقم السري للبطاقة البنكية، ماذا تفعل؟",

    options: [
      "أعطيه الرقم",
      "أرفض مشاركة الرقم",
      "أرسل الرقم برسالة"
    ],

    correct: 1
  },

  {
    q: "وصلتك رسالة تقول إنك ربحت جائزة وتطلب رسومًا لاستلامها. ماذا تفعل؟",

    options: [
      "أدفع الرسوم مباشرة",
      "أرسل بياناتي",
      "أتحقق من المصدر الرسمي"
    ],

    correct: 2
  },

  {
    q: "أي كلمة مرور تعتبر أقوى؟",

    options: [
      "123456",
      "password",
      "Ab7@kLm92!x"
    ],

    correct: 2
  },

  {
    q: "شخص طلب منك رمز التحقق OTP. ماذا تفعل؟",

    options: [
      "أعطيه الرمز",
      "أرفض مشاركة الرمز",
      "أرسله لصديقي"
    ],

    correct: 1
  },

  {
    q: "كيف تتأكد من سلامة الموقع الإلكتروني؟",

    options: [
      "أضغط على أي رابط",
      "أتحقق من عنوان الموقع الرسمي",
      "أدخل بياناتي في أي موقع"
    ],

    correct: 1
  }

];


/* =====================================
   ثالثاً: متغيرات الاختبار
===================================== */

let currentQuestion = 0;

let score = 0;


/* =====================================
   رابعاً: عرض السؤال
===================================== */

function loadQuestion() {

  const container = document.getElementById("quizContainer");

  if (!container) {
    return;
  }

  if (currentQuestion >= quizQuestions.length) {

    container.innerHTML = `
      <div class="alert alert-success text-center">

        <h3>نتيجتك: ${score} من ${quizQuestions.length}</h3>

        <p>
          ${
            score >= 4
              ? "ممتاز! أنت واعٍ أمنيًا 🎉"
              : "تحتاج إلى مراجعة دليل الحماية 📖"
          }
        </p>

        <button
          class="btn btn-primary"
          onclick="restartQuiz()">

          إعادة الاختبار

        </button>

      </div>
    `;

    return;
  }

  const q = quizQuestions[currentQuestion];

  let html = `
    <h4 class="mb-4">
      السؤال ${currentQuestion + 1} من ${quizQuestions.length}
    </h4>

    <p class="fw-bold fs-5">
      ${q.q}
    </p>
  `;

  q.options.forEach((opt, i) => {

    html += `
      <button
        class="btn btn-outline-secondary quiz-option"
        onclick="answerQuestion(${i})">

        ${opt}

      </button>
    `;

  });

  container.innerHTML = html;

}


/* =====================================
   خامساً: التحقق من الإجابة
===================================== */

function answerQuestion(index) {

  if (index === quizQuestions[currentQuestion].correct) {

    score++;

    alert("إجابة صحيحة ✅");

  } else {

    alert(
      "إجابة خاطئة ❌\nالإجابة الصحيحة: " +
      quizQuestions[currentQuestion].options[
        quizQuestions[currentQuestion].correct
      ]
    );

  }

  currentQuestion++;

  loadQuestion();

}


/* =====================================
   سادساً: إعادة الاختبار
===================================== */

function restartQuiz() {

  currentQuestion = 0;

  score = 0;

  loadQuestion();

}


/* =====================================
   سابعاً: تشغيل الاختبار عند فتح الصفحة
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("quizContainer")) {

    loadQuestion();

  }

});
