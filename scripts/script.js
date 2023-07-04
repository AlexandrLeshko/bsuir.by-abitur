"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const menuBtns = document.querySelectorAll(".menu__btn"),
  menuBlocks = document.querySelectorAll(".menu__mobile-block"),
  greyButtons = document.querySelectorAll(".grey-button"),
  greybuttonBlocks = document.querySelectorAll(".grey-button__block"),
  popup = document.querySelector(".popup"),
  popupClose = popup.querySelector(".popup__close"),
  popupOpenBtn = document.querySelector(".header__links");

  //Mobile
  function hiddenMenuBlocks() {
    menuBtns.forEach((btn) => {
      btn.querySelector(".menu__img").classList.remove("menu__img--active");
    });
    menuBlocks.forEach((block) => {
      block.classList.remove("show");
      block.classList.add("hidden");
    });
  }

  menuBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (menuBlocks[i].classList.contains("show")) {
        hiddenMenuBlocks();
      } else {
        hiddenMenuBlocks();
        menuBtns[i]
          .querySelector(".menu__img")
          .classList.add("menu__img--active");
        menuBlocks[i].classList.add("show");
        menuBlocks[i].classList.remove("hidden");
      }
    });
  });

  //grey-button blocks
  function hiddenBlocks() {
    greyButtons.forEach((btn) => {
      btn.classList.remove("grey-button--active");
    });
    greybuttonBlocks.forEach((block) => {
      block.classList.remove("show");
      block.classList.add("hidden");
    });
  }

  greyButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (greybuttonBlocks[i].classList.contains("show")) {
        hiddenBlocks();
      } else {
        hiddenBlocks();
        greyButtons[i].classList.add("grey-button--active");
        greybuttonBlocks[i].classList.add("show");
        greybuttonBlocks[i].classList.remove("hidden");
      }
    });
  });

  //popup
  function openPopup() {
    popup.classList.remove("hidden__opacity");
    popup.classList.add("show__opacity");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    popup.classList.remove("show__opacity");
    popup.classList.add("hidden__opacity");
    document.body.style.overflow = "";
  }

  popupOpenBtn.addEventListener("click", openPopup);
  popupClose.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  //toggler
  $(".toggler").click(function () {
    $(this).next().toggle("slow");
    $(this).closest("p.toggler").toggleClass("no-active");
  });

  // //checkselect
  (function ($) {
    function setChecked(target) {
      var parent = $(target).closest('div.checkselect');
      var checked = $(target).find("input[type='checkbox']:checked").length;
      if (checked) {
        $(target)
          .find("select option:first")
          .html("Выбрано: " + checked);
        if ( parent.attr('name') == 'faculties' ) {
          $(target).find('select option:first').html('Факультетов: '+ checked);
        }
        if ( parent.attr('name') == 'fo' ) {
          $(target).find('select option:first').html('Форм обучения: '+ checked);
        }
      } else {
        if ( parent.attr('name') == 'faculties' ) {
          $(target).find('select option:first').html('Факультеты');
        }
        if ( parent.attr('name') == 'fo' ) {
          $(target).find('select option:first').html('Форма обучения');
        }      }
    }
    $.fn.checkselect = function () {
      // this.wrapInner('<div class="checkselect-popup"></div>');
      // this.prepend('<div class="checkselect-control">' + '<select class="form-control"><option></option></select>' + '<div class="checkselect-over"></div>' + "</div>");
      // this.each(function () {
      //   setChecked(this);
      // });
      // this.find('input[type="checkbox"]').click(function () {
      //   setChecked($(this).parents(".checkselect"));
      // });
    };
  })(jQuery);
  $(".checkselect").checkselect();

  //table
  const columnBox = document.querySelector(".table__column-blocks"),
    filterBox = document.querySelector(".filter"),
    filterBtn = filterBox.querySelector("[data-send]");
  function columnRender() {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    if (mediaQuery.matches) {
      const tableRow = document.querySelectorAll(".table tr");
      columnBox.innerHTML = "";

      tableRow.forEach((row, i) => {
        const cellContent = row.querySelector(".table__column-spec");

        if (cellContent != null && row.style.display != "none") {
          const newCell = document.createElement("div");

          if (i == 0) {
            newCell.style.height = `${
              document.querySelector(".table thead").clientHeight
            }px`;
            newCell.classList.add("table__special-cell");
          }

          newCell.classList.add("table__block-cell");
          newCell.innerHTML = cellContent.innerHTML;
          columnBox.append(newCell);

          if (row.parentNode.tagName.toLowerCase() == "tbody") {
            setHeight(newCell, row);
            newCell.classList.add(row.className);
          }
        }
      });
    }
  }

  function setHeight(cell, row) {
    if (row.offsetHeight > cell.offsetHeight) {
      cell.style.height = `${row.offsetHeight}px`;
    } else if (row.offsetHeight < cell.offsetHeight) {
      row.style.height = `${cell.offsetHeight}px`;
    }
  }

  columnRender();

  filterBox.addEventListener("click", (e) => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    if (mediaQuery.matches) {
      if (e.target === filterBtn) {
        e.preventDefault();
        columnRender();
      }
    }
  });

  window.addEventListener("resize", () => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    if (mediaQuery.matches) {
      columnRender();
    }
  });
  
  const tbody = document.querySelector(".table tbody");
  let tableRows;
  let tableArr = [];
  function getRows() {
    tableRows = document.querySelectorAll(".table tbody tr");
  }
  function getMatrix() {
    getRows();
    tableRows.forEach((row) => {
      tableArr.push(row.querySelectorAll("td"));
    });
  }
  function setCellAtribut() {
    getMatrix();
    tableRows.forEach((row, i) => {
      tableArr[i].forEach((cell, j) => {
        cell.setAttribute("data-id-cell", j);
      });
    });
  }
  function checkCellNumbers(e) {
    setCellAtribut();
    tableRows.forEach((row, i) => {
      tableArr[i].forEach((cell) => {
        if (e.target == cell) {
          let x = +cell.getAttribute("data-id-cell");
          deleteColorCell();
          setColorCell(row, i, x);
        }
      });
    });
  }
  function deleteColorCell() {
    tableArr.forEach((row) => {
      row.forEach((cell) => {
        cell.classList.remove("table__row-fitu--active");
        cell.classList.remove("table__row-fksis--active");
        cell.classList.remove("table__row-fre--active");
        cell.classList.remove("table__row-ief--active");
        cell.classList.remove("table__row-fik--active");
        cell.classList.remove("table__row-iit--active");
        cell.classList.remove("table__row-vf--active");
        cell.classList.remove("table__row-fkp--active");
      });
    });
  }
  function setColorCell(row, rowID, cellID) {
    if (cellID != 0) {
      for (let i = rowID; i >= 0; i--) {
        tableArr[i][cellID].classList.add(`${row.className}--active`);
      }
      for (let i = cellID; i >= 0; i--) {
        tableArr[rowID][i].classList.add(`${row.className}--active`);
      }
    }
  }
  tbody.addEventListener("mouseover", checkCellNumbers);
});