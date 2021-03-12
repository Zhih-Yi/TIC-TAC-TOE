window.onload = function () {
    //取得歷史資料
    scoreArr = JSON.parse(localStorage.getItem("tic-tac-toe")) || [];
    //開始按鈕
    document.querySelector('.js-btn-start').addEventListener('click', function () {
        //輸入玩家姓名
        var Modal = new bootstrap.Modal(document.getElementById('userModal'), {
        })
        document.querySelector('.js-btn-save').addEventListener('click', function () {
            if (document.querySelector('.js-playerO').value === "" || document.querySelector('.js-playerX').value == "") return;
            playerO = document.querySelector('.js-playerO').value;
            playerX = document.querySelector('.js-playerX').value;
            document.querySelector('.game-bg').classList.remove('d-none');
            document.querySelector('.start-bg').classList.add('d-none');
            Modal.hide()
            playGame();
        })
        Modal.show();

    })
    //重新按鈕 不計分
    document.querySelector('.js-restart').addEventListener('click', function () {
        //清空內容
        clear();
        playGame();
    })
    //再玩一次
    let playAgain = document.querySelectorAll('.js-result-restart');

    playAgain.forEach((value) => {
        value.addEventListener('click', function () {
            //清空內容
            clear();
            document.querySelector('.game').classList.remove('d-none');
            let reuslts = document.querySelectorAll('.result');
            reuslts.forEach((value) => {
                value.classList.add('d-none');
                value.querySelector('.js-save').classList.remove('d-none');
            })

            playGame();

        })
    })

    //排行榜
    document.querySelector('.js-record').addEventListener('click', function () {

        let gamesEL = document.querySelectorAll('.game-bg');
        gamesEL.forEach((value) => {
            value.classList.add('d-none');
        })

        document.querySelector('.start-bg').classList.add('d-none');
        document.querySelector('.records').classList.remove('d-none');
        let historyEl = document.querySelector('.history-content');
        let rankingStr = '';
        let scoreArrlen = scoreArr.length;
        if (scoreArrlen === 0) {
            rankingStr = '<p class="text-center text-white py-2">No Record</p>';
            historyEl.innerHTML = rankingStr;
            return;
        }
        for (let i = 0; i < scoreArrlen; i++) {
            for (let j = 0; j < scoreArrlen; j++) {

                if (scoreArr[j]?.score < scoreArr[j + 1]?.score) {
                    let temp = scoreArr[j]
                    scoreArr[j] = scoreArr[j + 1];
                    scoreArr[j + 1] = temp;
                }
            }
        }

        for (let i = 0; i < scoreArrlen; i++) {
            if (i === 10) { break; }
            if (i === 0) {
                rankingStr += `<div class="col-sm-4 col-6"><i class="fas fa-crown text-warning me-2"></i>${i + 1}. ${scoreArr[i]?.Name}</div>
                         <div class="col-sm-4 col-6">${scoreArr[i]?.score > 0 ? scoreArr[i]?.score : 0}</div>
                         <div class="col-sm-4 d-none d-sm-block">${scoreArr[i]?.Time}</div>`;
            } else if (i < 3 && i !== 0) {
                rankingStr += `<div class="col-sm-4 col-6"><i class="fas fa-medal text-success me-2"></i>${i + 1}. ${scoreArr[i]?.Name}</div>
                         <div class="col-sm-4 col-6">${scoreArr[i]?.score > 0 ? scoreArr[i]?.score : 0}</div>
                         <div class="col-sm-4 d-none d-sm-block">${scoreArr[i]?.Time}</div>`;
            } else {
                rankingStr += `<div class="col-sm-4 col-6"><i class="me-4"></i>${i + 1}. ${scoreArr[i]?.Name}</div>
                         <div class="col-sm-4 col-6">${scoreArr[i]?.score > 0 ? scoreArr[i]?.score : 0}</div>
                         <div class="col-sm-4 d-none d-sm-block">${scoreArr[i]?.Time}</div>`;
            }

        }

        historyEl.innerHTML = rankingStr;
    })


    document.querySelector('.js-back').addEventListener('click', function () {

        document.querySelector('.start-bg').classList.remove('d-none');
        document.querySelector('.records').classList.add('d-none');
    })
    let saveEls = document.querySelectorAll('.js-save');
    saveEls.forEach((value) => {
        value.addEventListener('click', function (e) {
            Save();
            this.classList.add('d-none');
        })
    })
}
function clear() {
    let spanEls = document.querySelectorAll('.game-bg .board span');
    document.querySelector('.js-turn').classList.add('text-end');
    spanEls.forEach((value, index) => {
        value.textContent = index;
        value.classList.add('invisible');
        value.classList.remove('text-white');
    })
    IsCircle = true;
    crossArr = [];
    circleArr = [];
}
let crossArr = [];
let circleArr = [];
let winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
let IsCircle = true;
let circleScore = 0;
let crossScore = 0;
let scoreArr = [];
let playerO = "";
let playerX = "";
let IsEnd = false;
function playGame() {
    //顯示分數
    document.querySelector('.js-scoreO').textContent = circleScore;
    document.querySelector('.js-scoreX').textContent = crossScore;
    //點擊
    document.querySelector('.game-bg .board').addEventListener("click", function (e) {
        if (e.target.nodeName !== "DIV") return;
        if (e.target.querySelector('span')?.textContent === "◯" || e.target.querySelector('span')?.textContent === "✘") return;

        if (IsCircle) {
            //紀錄
            circleArr.push(Number(e.target.querySelector('span')?.textContent));
            //畫面
            e.target.querySelector('span').innerText = '◯';
            e.target.querySelector('span').classList.remove('invisible');
            e.target.querySelector('span').classList.add('scale3');
            //檢查是否勝利
            checkGame();

            IsCircle = false;
            document.querySelector('.js-turn').classList.remove('text-end');

        }
        else {
            //紀錄
            crossArr.push(Number(e.target.querySelector('span')?.textContent));
            //畫面
            e.target.querySelector('span').innerText = '✘';
            e.target.querySelector('span').classList.remove('invisible');
            e.target.querySelector('span').classList.add('text-white');
            e.target.querySelector('span').classList.add('scale3');
            //檢查是否勝利

            checkGame();

            IsCircle = true;
            document.querySelector('.js-turn').classList.add('text-end');
        }

    });

    document.querySelector('.js-index').addEventListener('click', function () {
        document.querySelector('.game').classList.add('d-none');
        document.querySelector('.start-bg').classList.remove('d-none');
    })
}
//檢查是否勝利
function checkGame() {

    if (circleArr.length > 2 || crossArr.length > 2) {
        winCombination.forEach((item, index) => {

            let a = item[0];
            let b = item[1];
            let c = item[2];
            let num1;
            let num2;
            let num3;
            if (IsCircle) {
                num1 = circleArr.indexOf(a);
                num2 = circleArr.indexOf(b);
                num3 = circleArr.indexOf(c);

                if (num1 !== -1 && num2 !== -1 && num3 !== -1) {
                    //算分數
                    circleScore += 1;
                    circleArr = [];

                    //畫面
                    let scoreBoxY = document.querySelectorAll('.js-scoreO');
                    scoreBoxY.forEach((value) => {
                        value.textContent = circleScore;
                    })
                    setTimeout(function () {
                        document.querySelector('.game-bg').classList.add('d-none');
                        document.querySelector('.OWin-bg').classList.remove('d-none');

                    }, 800)


                } else {
                    //平手
                    if (circleArr.length + crossArr.length === 9) {
                        setTimeout(function () {
                            document.querySelector('.draw-bg').classList.remove('d-none');
                            document.querySelector('.game-bg').classList.add('d-none')
                        }, 800);

                        circleArr = [];
                        crossArr = [];


                    }
                }


            }
            else {

                num1 = crossArr.indexOf(a);
                num2 = crossArr.indexOf(b);
                num3 = crossArr.indexOf(c);
                if (num1 !== -1 && num2 !== -1 && num3 !== -1) {
                    //算分數

                    crossScore += 1;
                    crossArr = [];

                    //畫面
                    let scoreBoxX = document.querySelectorAll('.js-scoreX');
                    scoreBoxX.forEach((value) => {
                        value.textContent = crossScore;
                    })
                    setTimeout(function () {
                        document.querySelector('.game-bg').classList.add('d-none');
                        document.querySelector('.XWin-bg').classList.remove('d-none')
                    }, 800);


                } else {
                    //平手
                    if (circleArr.length + crossArr.length === 9) {
                        setTimeout(function () {
                            document.querySelector('.draw-bg').classList.remove('d-none');
                            document.querySelector('.game-bg').classList.add('d-none')
                        }, 800);

                        circleArr = [];
                        crossArr = [];


                    }
                }
            }
        });
    }
}
//儲存戰績
function Save() {
    //儲存localstorage
    if (playerO === "" && playerX === "") return;
    let time = new Date();
    let dateNow = `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

    let ORecord = { Name: playerO, Time: dateNow, score: circleScore };
    let XRecord = { Name: playerX, Time: dateNow, score: crossScore };
    scoreArr.push(ORecord);
    scoreArr.push(XRecord);
    localStorage.setItem("tic-tac-toe", JSON.stringify(scoreArr));

}