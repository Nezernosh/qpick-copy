"use strict";

import { headphones, wireless, checkCartCounter } from "./module.js";

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function loadCart() {
    let catalog = document.getElementById("order");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        if (key.includes("#")) {
            //ищем "наши" ключи образованные от ссылок типа #productName_productNumber (массив входной продуктов и позиция объекта в нём)
            let productType = key.substring(1, key.indexOf("_"));
            let productNumber = key.substring(key.indexOf("_") + 1);
            let currentProduct = productType == "headphones" ?
                headphones[Number(productNumber)] : wireless[Number(productNumber)];
            catalog.innerHTML += `
            <div class="cart-product">
                <img src="${currentProduct.img}" class="cart-product__img"></img>
                <div>
                    <p class="cart-product__title">${currentProduct.title}</p>
                    <p class="cart-product__price">${currentProduct.price} &#x20bd;</p>
                </div>
                <button type="button" class="cart-product__delete" href="#${productType + '_' + productNumber}"></button>
                <div class="cart-product__amount">
                    <button type="button" class="cart-product__remove" href="#${productType + '_' + productNumber}">-</button>
                    <p>${sessionStorage.getItem(key)}</p>
                    <button type="button" class="cart-product__add" href="#${productType + '_' + productNumber}">+</button>
                </div>
                <div></div>
                <p class="cart-product__total-price">${Number(sessionStorage.getItem(key)) * Number(currentProduct.price)} &#x20bd;</p>
            </div>`;
        }
    }
}

function loadCartTotal() {
    let cartTotal = document.getElementById("total-price__value");
    let productsTotal = document.getElementsByClassName("cart-product__total-price");
    let sum = 0;
    for (let i = 0; i < productsTotal.length; i++) {
        sum += Number(productsTotal[i].innerHTML.slice(0, -2));
        //slice чтобы убрать пробел и символ рубля
    }
    cartTotal.innerHTML = sum + " &#x20bd;";
}

function ready() {
    checkCartCounter();
    //проверяем обновлённость счётчика над корзиной
    loadCart();
    //загружаем элементы (продукты) корзины
    loadCartTotal();
    //устанавливаем общую стоимость всей корзины

    let productAddButtons = document.getElementsByClassName("cart-product__add");
    for (let i = 0; i < productAddButtons.length; i++) {
        let button = productAddButtons[i];
        button.addEventListener('click', addButtonClicked);
    }

    let productRemoveButtons = document.getElementsByClassName("cart-product__remove");
    for (let i = 0; i < productRemoveButtons.length; i++) {
        let button = productRemoveButtons[i];
        button.addEventListener('click', removeButtonClicked);
    }

    let productDeleteButtons = document.getElementsByClassName("cart-product__delete");
    for (let i = 0; i < productDeleteButtons.length; i++) {
        let button = productDeleteButtons[i];
        button.addEventListener('click', deleteButtonClicked);
    }
}

function addButtonClicked(event) {
    ++sessionStorage.cartCount;
    checkCartCounter();
    //прибавляем счётчик над корзиной
    let btn = event.target;
    let productLink = btn.getAttribute("href");
    sessionStorage.setItem(productLink,
        Number(sessionStorage.getItem(productLink)) + 1);
    //увеличиваем количество по ключу для sessionStorage
    let productCounter = btn.parentElement.children[1];
    productCounter.innerHTML = Number(productCounter.innerHTML) + 1;
    //увеличиваем значение счётчика продукта
    let productPrice = btn.parentElement.parentElement.getElementsByClassName("cart-product__price")[0];
    let productTotalPrice = btn.parentElement.parentElement.getElementsByClassName("cart-product__total-price")[0];
    productTotalPrice.innerHTML = Number(productTotalPrice.innerHTML.slice(0, -2)) + Number(productPrice.innerHTML.slice(0, -2)) + " &#x20bd;";
    //увеличиваем общую стоимость конкретного продукта
    loadCartTotal();
    //устанавливаем общую стоимость всей корзины
}

function removeButtonClicked(event) {
    --sessionStorage.cartCount;
    checkCartCounter();
    //убавляем счётчик над корзиной
    let btn = event.target;
    let productLink = btn.getAttribute("href");
    if (Number(sessionStorage.getItem(productLink)) > 1) {
        sessionStorage.setItem(productLink,
            Number(sessionStorage.getItem(productLink)) - 1);
        //если конкретного продукта больше 1 единицы в sessionStorage, то уменьшаем там значение по ключу
        let productCounter = btn.parentElement.children[1];
        productCounter.innerHTML = Number(productCounter.innerHTML) - 1;
        //уменьшаем значение счётчика под продуктом
        let productPrice = btn.parentElement.parentElement.getElementsByClassName("cart-product__price")[0];
        let productTotalPrice = btn.parentElement.parentElement.getElementsByClassName("cart-product__total-price")[0];
        productTotalPrice.innerHTML = Number(productTotalPrice.innerHTML.slice(0, -2)) - Number(productPrice.innerHTML.slice(0, -2)) + " &#x20bd;";
        //уменьшаем общую стоимость за отдельный продукт в корзине
    }
    else {
        sessionStorage.removeItem(productLink);

        btn.parentElement.parentElement.remove();
    }
    //если отдельный продукт остался в одном экземпляре, то удаляем ключ из sessionStorage и удаляем блок с из html структуры
    loadCartTotal();
    //устанавливаем общую стоимость всей корзины
}

function deleteButtonClicked(event) {
    let btn = event.target;
    let productLink = btn.getAttribute("href");
    sessionStorage.cartCount -= sessionStorage.getItem(productLink);
    checkCartCounter();
    //убавляем счётчик над корзиной
    sessionStorage.removeItem(productLink);
    //удаляем ключ из sessionStorage
    btn.parentElement.remove();
    //удаляем блок с из html структуры
    loadCartTotal();
    //устанавливаем общую стоимость всей корзины
}