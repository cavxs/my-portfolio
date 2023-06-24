const words = [
  "WEB DEVELOPER",
  "MOBILE DEVELOPER",
  "SOFTWARE ENGINEER",
  "WEB DESIGNER",
  "FRONTEND DEVELOPER",
  "BACKEND DEVELOPER",
];

window.STARTGUIANIMATIONS = () => {
  var f1 = document.getElementById("1f");
  var f2 = document.getElementById("2f");
  var f3 = document.getElementById("3f");

  var f1a = { val: "0+" };
  var f2a = { val: "+0%" };
  var f3a = { val: "0%" };

  anime({
    targets: f1a,
    val: "20+",
    round: 1,
    delay: 200,
    duration: 1500,
    easing: "easeOutCubic",
    update: function () {
      f1.innerText = f1a.val;
    },
  });
  anime({
    targets: f2a,
    val: "+200%",
    round: 1,
    easing: "easeOutCubic",
    delay: 1000,
    duration: 1500,
    update: function () {
      f2.innerText = "+" + f2a.val;
    },
  });
  anime({
    targets: f3a,
    val: "100%",
    round: 1,
    easing: "easeOutCubic",
    delay: 2000,
    duration: 1500,
    update: function () {
      f3.innerText = f3a.val;
    },
  });
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 0;
    // console.log(elementTop, windowHeight);

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

const sections = document.querySelectorAll("#gui section.guisection");

window.INITIALIZE_LISTENERS = () => {
  // To check the scroll position on page load
  reveal();
  // sectionOffsets["home"] = 0;
  // sectionOffsets["about-me"] = ;
  // sectionOffsets["ach"] = ;
  // sectionOffsets["hire"] = ;

  const sectionOffsets = [
    0,
    document.querySelector("#about-me").offsetTop - 100,
    document.querySelector("#ach").offsetTop - 100,
    document.querySelector("#hire").offsetTop - 200,
  ];

  const SCENE = window.experience.scene;
  document.getElementById("gui").addEventListener("scroll", (e) => {
    reveal();

    const scrollT = e.target.scrollTop;

    let section_at = "home";
    for (var i = 0; i < sectionOffsets.length; i++) {
      if (scrollT >= sectionOffsets[i]) {
        section_at = sections[i].id;
      }
    }

    // if the section i am at right now by scrolling is not the same as the section in the exprience

    if (SCENE.current_section !== section_at) {
      history.replaceState(null, null, "#" + section_at);
      SCENE.current_section = section_at;
      // console.log("new section:", section_at);
    }
  });
  wordflick();
};

const prSroller = document.querySelector("#about-me .projects");
const projects = document.querySelectorAll("#about-me .projects > div");
const dotContainer = document.querySelector("#dots");
const projects_arrow = document.getElementById("pr-arrow");
var projects_at = 0;

const move_pr_to = (i) => {
  anime({
    targets: prSroller,
    scrollLeft: i * 400,
    easing: "easeInOutQuad",
    duration: 500,
  });
};

projects.forEach((p, i) => {
  const d = document.createElement("div");
  d.setAttribute("data-i", i);
  if (i == 0) d.classList.add("selected");
  dotContainer.appendChild(d);
});

const dots = document.querySelectorAll("#dots div");

const renderDots = (i) => {
  dots.forEach((dot) => dot.classList.remove("selected"));
  dots.item(i).classList.add("selected");
};

dots.forEach((c) => {
  c.addEventListener("click", (e) => {
    console.log(prSroller.scrollLeft);
    projects_at = Number(c.getAttribute("data-i"));
    move_pr_to(projects_at);
    renderDots(projects_at);
  });
});

projects_arrow.addEventListener("click", () => {
  if (projects_at < projects.length - 1) {
    projects_at++;
    move_pr_to(projects_at);
    renderDots(projects_at);
  }
});

const hireMeSelections = document.querySelectorAll("#hire .selection ul");

hireMeSelections.forEach((ul) => {
  const children = Array.from(ul.children);
  children.forEach((c) => {
    c.addEventListener("click", () => {
      children.forEach((cc) => cc.classList.remove("selected"));
      c.classList.add("selected");
    });
  });
});

const hirePDetails = document.getElementById("hirepdetails");

hirePDetails.oninput = () => {
  hirePDetails.style.height = "";
  hirePDetails.style.height = hirePDetails.scrollHeight + "px";
};

const skill_phrase = document.getElementById("skill-phrase");

var part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 100, // 15
  speed = 30;
function wordflick() {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substring(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    skill_phrase.innerText = part;
  }, speed);
}
