const main_div = document.querySelector(".main_div");
const ul = document.querySelector(".ul");
const input = document.querySelector(".input");
const btn_search = document.querySelector(".btn_search");
const show_more = document.querySelector(".show_more");
const loader = document.getElementById("loader");
const not_found = document.getElementById("not_found");
const select_count = document.querySelector(".select_count");
const select_type = document.querySelector(".select_type");
const up = document.querySelector(".up");

let count_page = 1;
let get_value = "";

async function get_pixabay(
  value_from_input,
  get_select_count,
  get_select_type,
  get_count_page,
  clearList = false
) {
  const api_key = "";
  const url = `https://pixabay.com/api/?key=${api_key}&q=${value_from_input}&per_page=${get_select_count}&image_type=${get_select_type}&page=${get_count_page}`;
  try {
    loader.classList.remove("loader_off");
    loader.classList.add("loader");
    const get_fetch = await fetch(url);
    if (!get_fetch.ok) {
      throw new Error(`get_fetch status: ${get_fetch.status}`);
    } else {
      const convert = await get_fetch.json();
      if (clearList) {
        ul.innerHTML = "";
      }
      setTimeout(() => {
        loader.classList.add("loader_off");
        loader.classList.remove("loader");
        if (convert.hits.length === 0) {
          not_found.classList.remove("not_found");
          not_found.classList.add("display_not_found");
        } else {
          if (convert.totalHits > count_page * get_select_count) {
            show_more.classList.add("show_more_display");
          } else {
            show_more.classList.remove("show_more_display");
          }
          not_found.classList.add("not_found");
          not_found.classList.remove("display_not_found");
          convert.hits.forEach((element) => {
            const li = document.createElement("li");
            li.classList.add("li_style");
            const img = document.createElement("img");
            img.src = element.webformatURL;
            const div_for_img = document.createElement("div");
            div_for_img.classList.add("div_img");
            div_for_img.appendChild(img);
            li.appendChild(div_for_img);
            ul.appendChild(li);
          });
        }
      }, 1500);
    }
  } catch (error) {
    console.log(error.message);
  }
}

btn_search.addEventListener("click", () => {
  if (input.value === "") {
    return;
  } else if (input.value.trim() === "") {
    return;
  } else {
    count_page = 1;
    get_value = input.value;
    const send_select_count = select_count.value;
    const send_select_type = select_type.value;
    get_pixabay(
      get_value,
      send_select_count,
      send_select_type,
      count_page,
      true
    );
    input.value = "";
    not_found.classList.add("not_found");
    not_found.classList.remove("display_not_found");
    show_more.classList.add("show_more");
    show_more.classList.remove("show_more_display");
  }
});

show_more.addEventListener("click", () => {
  count_page++;
  const send_select_count = select_count.value;
  const send_select_type = select_type.value;
  get_pixabay(get_value, send_select_count, send_select_type, count_page);
});

window.addEventListener("keydown", (a) => {
  if (a.code === "Enter") {
    count_page = 1;
    get_value = input.value;
    const send_select_count = select_count.value;
    const send_select_type = select_type.value;
    get_pixabay(
      get_value,
      send_select_count,
      send_select_type,
      count_page,
      true
    );
    input.value = "";
    not_found.classList.add("not_found");
    not_found.classList.remove("display_not_found");
    show_more.classList.add("show_more");
    show_more.classList.remove("show_more_display");
  }
});

up.addEventListener("click", () => {
  window.scrollTo({ top: 0 });
});

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
});

