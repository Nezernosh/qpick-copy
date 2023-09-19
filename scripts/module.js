export const headphones = [
    {
        img: "../assets/img/S8521.png",
        title: "Apple BYZ S8521",
        price: 2927,
        rate: 4.7
    },
    {
        img: "../assets/img/EarPods1.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
    {
        img: "../assets/img/EarPods2.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
    {
        img: "../assets/img/S8521.png",
        title: "Apple BYZ S8521",
        price: 2927,
        rate: 4.7
    },
    {
        img: "../assets/img/EarPods1.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
    {
        img: "../assets/img/EarPods2.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    }
];
//несмотря на повторение элементов они будут считаться отдельными продуктами, т.к. логика подразумевает уникальность продуктов в каталоге

export const wireless = [
    {
        img: "../assets/img/EarPods3.png",
        title: "Apple AirPods",
        price: 9527,
        rate: 4.7
    },
    {
        img: "../assets/img/GH-04.png",
        title: "GERLAX GH-04",
        price: 6527,
        rate: 4.7
    },
    {
        img: "../assets/img/BO4.png",
        title: "BOROFONE BO4",
        price: 7527,
        rate: 4.7
    }
];

export function checkCartCounter() {
    if (!sessionStorage.cartCount) {
        sessionStorage.cartCount = 0;
    }
    else if (sessionStorage.cartCount == 0) {
        document.getElementById("cart-count").style = "display: none";
    }
    else {
        document.getElementById("cart-count").style = "display: block";
    }
    document.getElementById("cart-count").innerHTML = sessionStorage.cartCount;
}