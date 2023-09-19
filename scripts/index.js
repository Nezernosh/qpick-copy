"use strict";

import { headphones, wireless, checkCartCounter } from "./module.js";

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function loadProduct(productArray, productName) {
    let catalog = document.getElementById(productName);
    productArray.forEach(element => {
        catalog.innerHTML += `
        <div class="product-card">
            <img src="${element.img}" class="product-card__img"></img>
            <div class="product-card__row">
                <p class="product-card__title">${element.title}</p>
                <p class="product-card__price">${element.price} &#x20bd;</p>
            </div>
            <div class="product-card__row">
                <div class="product-card__column">
                    <img class="icon star"></img>
                    <p class="product-card__rating-text">${element.rate}</p>
                </div>
                <a class="product-card__buy" href="#${productName + '_' + productArray.indexOf(element)}">Купить</a>
            </div>
        </div>`;
    });
}

function ready() {
    checkCartCounter();
    //проверяем обновлённость счётчика над корзиной
    loadProduct(headphones, "headphones");
    loadProduct(wireless, "wireless");
    //загружаем элементы (продукты) каталога

    let addToCartButtons = document.getElementsByClassName("product-card__buy");
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}

function addToCartClicked(event) {
    ++sessionStorage.cartCount;
    checkCartCounter();
    //прибавляем счётчик над корзиной

    let productLink = event.target.getAttribute("href");
    //href атрибут ссылки вида #productType_productPos (тип и позиция в входных массивах)
    if (sessionStorage.getItem(productLink)) {
        //если есть уже, то обновляем счётчик по ключу
        sessionStorage.setItem(productLink,
            Number(sessionStorage.getItem(productLink)) + 1);
    }
    else {
        sessionStorage.setItem(productLink, 1);
        //если такой продукт ещё не добавляли в корзину, то создаём ключ по href со значением 1
    }
}