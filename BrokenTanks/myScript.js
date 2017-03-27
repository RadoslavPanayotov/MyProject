var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

function Tank(x, y, currentPosition) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "kxYRS.png";
    this.currentPosition = currentPosition;
    this.bulletImage = new Image();
    this.bulletImage.src = "bullet.png";
    this.bulletImage.currentX = 0;
    this.bulletImage.currentY = 0;
    this.shotFired = false;
    this.bulletPos = "";
    this.shotFiredLegit = false;
    this.currentBullet = "";
}
tankUp = {
    x: 80, y: 80,
    spriteWidth: 62,
    spriteHeight: 77
};
tankDown = {
    x: 80, y: 205,
    spriteWidth: 62,
    spriteHeight: 77
};
tankLeft = {
    x: 248, y: 212,
    spriteWidth: 77,
    spriteHeight: 62
};
tankRight = {
    x: 248, y: 87,
    spriteWidth: 77,
    spriteHeight: 62
};
masterTank = new Tank(canvas.width / 2 - tankUp.spriteWidth / 2, canvas.height - tankUp.spriteHeight, "up");
masterTank.image.addEventListener("load", function () {
    context.drawImage(masterTank.image, tankUp.x, tankUp.y,
        tankUp.spriteWidth, tankUp.spriteHeight,
        masterTank.x, masterTank.y,
        tankUp.spriteWidth, tankUp.spriteHeight);
}, false);

function clearCurrentPosition(tank) {
    if (tank.currentPosition) {
        switch (tank.currentPosition) {
            case "up":
                context.clearRect(tank.x, tank.y, tankUp.spriteWidth, tankUp.spriteHeight);
                break;
            case "down":
                context.clearRect(tank.x, tank.y, tankDown.spriteWidth, tankDown.spriteHeight);
                break;
            case "left":
                context.clearRect(tank.x, tank.y, tankLeft.spriteWidth, tankLeft.spriteHeight);
                break;
            case "right":
                context.clearRect(tank.x, tank.y, tankRight.spriteWidth, tankRight.spriteHeight);
                break;
            default: break;
        }
    } else {
        console.log("Missing tank pos");
    }
}
var tankSpeed = 5;
Tank.prototype.move = function (direction) {
    switch (direction) {
        case "left":
            if (this.x > 0 && this.tankCollision(direction)) {
                clearCurrentPosition(this);
                this.currentPosition = "left";
                this.x -= tankSpeed;
                context.drawImage(this.image, tankLeft.x, tankLeft.y,
                    tankLeft.spriteWidth, tankLeft.spriteHeight,
                    this.x, this.y,
                    tankLeft.spriteWidth, tankLeft.spriteHeight);
            }
            break;
        case "down":
            if (((this.y + tankDown.spriteHeight) < canvas.height) && this.tankCollision(direction)) {
                clearCurrentPosition(this);
                this.currentPosition = "down";
                this.y += tankSpeed;
                context.drawImage(this.image, tankDown.x, tankDown.y,
                    tankDown.spriteWidth, tankDown.spriteHeight,
                    this.x, this.y,
                    tankDown.spriteWidth, tankDown.spriteHeight);
            }
            break;
        case "up":
            if (this.y > 0 && this.tankCollision(direction)) {
                clearCurrentPosition(this);
                this.currentPosition = "up";
                this.y -= tankSpeed;
                context.drawImage(this.image, tankUp.x, tankUp.y,
                    tankUp.spriteWidth, tankUp.spriteHeight,
                    this.x, this.y,
                    tankUp.spriteWidth, tankUp.spriteHeight);
            }
            break;
        case "right":
            if ((this.x + tankRight.spriteWidth) < canvas.width && this.tankCollision(direction)) {
                clearCurrentPosition(this);
                this.currentPosition = "right";
                this.x += tankSpeed;
                context.drawImage(this.image, tankRight.x, tankRight.y,
                    tankRight.spriteWidth, tankRight.spriteHeight,
                    this.x, this.y,
                    tankRight.spriteWidth, tankRight.spriteHeight);
            }
            break;
        default: break;
    }
}
bulletUp = {
    x: 12, y: 108,
    spriteWidth: 8,
    spriteHeight: 13
};
bulletDown = {
    x: 12, y: 12,
    spriteWidth: 8,
    spriteHeight: 13
};
bulletLeft = {
    x: 12, y: 44,
    spriteWidth: 13,
    spriteHeight: 8
};
bulletRIght = {
    x: 12, y: 76,
    spriteWidth: 13,
    spriteHeight: 8
};
var bulletSpeed = 1;
Tank.prototype.shoot = function () {
    if (!this.shotFired) this.bulletPos = this.currentPosition;
    switch (this.bulletPos) {
        case "up":
            if (!this.shotFired) {
                context.drawImage(this.bulletImage, bulletUp.x, bulletUp.y,
                    bulletUp.spriteWidth, bulletUp.spriteHeight,
                    this.x + (tankUp.spriteWidth / 2) - (bulletDown.spriteWidth / 2), this.y - tankUp.spriteHeight / 4,
                    bulletUp.spriteWidth, bulletUp.spriteHeight);
                this.bulletImage.currentX = this.x + (tankUp.spriteWidth / 2) - (bulletDown.spriteWidth / 2);
                this.bulletImage.currentY = (this.y - tankUp.spriteHeight / 4) - bulletSpeed;
                this.shotFired = true;
            } else {
                context.clearRect(this.bulletImage.currentX, this.bulletImage.currentY + bulletSpeed, bulletUp.spriteWidth, bulletUp.spriteHeight);
                context.drawImage(this.bulletImage, bulletUp.x, bulletUp.y,
                    bulletUp.spriteWidth, bulletUp.spriteHeight,
                    this.bulletImage.currentX, this.bulletImage.currentY,
                    bulletUp.spriteWidth, bulletUp.spriteHeight);
                if (this.bulletImage.currentY < 0 || !(this.bulletCollision(this.bulletPos))) {
                    clearInterval(this.currentBullet);
                    context.clearRect(this.bulletImage.currentX, this.bulletImage.currentY, bulletUp.spriteWidth, bulletUp.spriteHeight);
                    this.shotFired = false;
                    this.shotFiredLegit = false;
                    this.bulletImage.currentX = 0;
                    this.bulletImage.currentY = 0;
                } else {
                    this.bulletImage.currentY -= bulletSpeed;
                }
            }
            break;
        case "down":
            if (!this.shotFired) {
                context.drawImage(this.bulletImage, bulletDown.x, bulletDown.y,
                    bulletDown.spriteWidth, bulletDown.spriteHeight,
                    this.x + (tankDown.spriteWidth / 2) - (bulletDown.spriteWidth / 2), this.y + tankDown.spriteHeight + tankDown.spriteHeight / 4,
                    bulletDown.spriteWidth, bulletDown.spriteHeight);
                this.bulletImage.currentX = this.x + (tankDown.spriteWidth / 2) - (bulletDown.spriteWidth / 2);
                this.bulletImage.currentY = (this.y + tankDown.spriteHeight + tankDown.spriteHeight / 4) + bulletSpeed;
                this.shotFired = true;
            } else {
                context.clearRect(this.bulletImage.currentX, this.bulletImage.currentY - bulletSpeed, bulletDown.spriteWidth, bulletDown.spriteHeight);
                context.drawImage(this.bulletImage, bulletDown.x, bulletDown.y,
                    bulletDown.spriteWidth, bulletDown.spriteHeight,
                    this.bulletImage.currentX, this.bulletImage.currentY,
                    bulletDown.spriteWidth, bulletDown.spriteHeight);
                if (this.bulletImage.currentY > canvas.height || !(this.bulletCollision(this.bulletPos))) {
                    clearInterval(this.currentBullet);
                    context.clearRect(this.bulletImage.currentX, this.bulletImage.currentY, bulletDown.spriteWidth, bulletDown.spriteHeight);
                    this.shotFired = false;
                    this.shotFiredLegit = false;
                } else {
                    this.bulletImage.currentY += bulletSpeed;
                }
            }
            break;
        case "left":
            if (!this.shotFired) {
                context.drawImage(this.bulletImage, bulletLeft.x, bulletLeft.y,
                    bulletLeft.spriteWidth, bulletLeft.spriteHeight,
                    this.x - bulletLeft.spriteWidth, this.y + (tankLeft.spriteHeight / 2 - bulletLeft.spriteHeight / 2),
                    bulletLeft.spriteWidth, bulletLeft.spriteHeight);
                this.bulletImage.currentX = (this.x - bulletLeft.spriteWidth) - bulletSpeed;
                this.bulletImage.currentY = this.y + (tankLeft.spriteHeight / 2 - bulletLeft.spriteHeight / 2);
                this.shotFired = true;
            } else {
                context.clearRect(this.bulletImage.currentX + bulletSpeed, this.bulletImage.currentY, bulletLeft.spriteWidth, bulletLeft.spriteHeight);
                context.drawImage(this.bulletImage, bulletLeft.x, bulletLeft.y,
                    bulletLeft.spriteWidth, bulletLeft.spriteHeight,
                    this.bulletImage.currentX, this.bulletImage.currentY,
                    bulletLeft.spriteWidth, bulletLeft.spriteHeight);
                if (this.bulletImage.currentX < 0 || !(this.bulletCollision(this.bulletPos))) {
                    clearInterval(this.currentBullet);
                    context.clearRect(this.bulletImage.currentX, this.bulletImage.currentY, bulletLeft.spriteWidth, bulletLeft.spriteHeight);
                    this.shotFired = false;
                    this.shotFiredLegit = false;
                } else {
                    this.bulletImage.currentX -= bulletSpeed;
                }
            }
            break;
        case "right":
            if (!this.shotFired) {
                context.drawImage(this.bulletImage, bulletRIght.x, bulletRIght.y,
                    bulletRIght.spriteWidth, bulletRIght.spriteHeight,
                    this.x + tankRight.spriteWidth, this.y + (tankRight.spriteHeight / 2 - bulletRIght.spriteHeight / 2),
                    bulletRIght.spriteWidth, bulletRIght.spriteHeight);
                this.bulletImage.currentX = this.x + tankRight.spriteWidth + bulletSpeed;
                this.bulletImage.currentY = this.y + (tankRight.spriteHeight / 2 - bulletRIght.spriteHeight / 2);
                this.shotFired = true;
            } else {
                context.clearRect(this.bulletImage.currentX - bulletSpeed, this.bulletImage.currentY, bulletRIght.spriteWidth, bulletRIght.spriteHeight);
                context.drawImage(this.bulletImage, bulletRIght.x, bulletRIght.y,
                    bulletRIght.spriteWidth, bulletRIght.spriteHeight,
                    this.bulletImage.currentX, this.bulletImage.currentY,
                    bulletRIght.spriteWidth, bulletRIght.spriteHeight);
                if (this.bulletImage.currentX > canvas.width || !(this.bulletCollision(this.bulletPos))) {
                    clearInterval(this.currentBullet);
                    context.clearRect(this.bulletImage.currentX, this.bulletImage.currentY, bulletRIght.spriteWidth, bulletRIght.spriteHeight);
                    this.shotFired = false;
                    this.shotFiredLegit = false;
                } else {
                    this.bulletImage.currentX += bulletSpeed;
                }
            }
            break;
        default: break;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37 || 39 || 38 || 40 || 32) {
        switch (event.keyCode) {
            //left
            case 37:
                masterTank.move("left");
                break;
            //right
            case 39:
                masterTank.move("right");
                break;
            //up
            case 38:
                masterTank.move("up");
                break;
            //down
            case 40:
                masterTank.move("down");
                break;
            //space
            case 32:
                if (!masterTank.shotFiredLegit) {
                    masterTank.shotFiredLegit = true;
                    var x = masterTank.shoot.bind(masterTank);
                    masterTank.currentBullet = setInterval(x, 1);
                }
                break;
            default: break;
        };
    };
}, false);
blocksArray = [];
function FilledBlock(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
function drawBlock(xblock, yblock, wblock, hblock) {
    context.fillStyle = '#000000'
    context.fillRect(xblock, yblock, wblock, hblock)
    blocksArray.push(new FilledBlock(xblock, yblock, wblock, hblock))
}

drawBlock(150, 150, 850, 50);
drawBlock(0, 375, 350, 50);
drawBlock(650, 375, 350, 50);
drawBlock(0, 600, 850, 50);
var bullshit = 5;
Tank.prototype.tankCollision = function (where) {
    for (var index = 0; index < blocksArray.length; index++) {
        switch (where) {
            case "up":
                if (blocksArray[index].y <= this.y - tankSpeed && this.y - tankSpeed <= (blocksArray[index].y + blocksArray[index].height)) {
                    if ((blocksArray[index].x <= this.x && this.x <= (blocksArray[index].x + blocksArray[index].width)) ||
                        (blocksArray[index].x <= (this.x + tankUp.spriteWidth) && (this.x + tankUp.spriteWidth) <= (blocksArray[index].x + blocksArray[index].width))) {
                        return false;
                    }
                }
                break;
            case "down":
                if (blocksArray[index].y <= this.y + tankDown.spriteHeight + tankSpeed && this.y + tankDown.spriteHeight + tankSpeed <= (blocksArray[index].y + blocksArray[index].height)) {
                    if ((blocksArray[index].x <= this.x && this.x <= (blocksArray[index].x + blocksArray[index].width)) ||
                        (blocksArray[index].x <= (this.x + tankDown.spriteWidth) && (this.x + tankDown.spriteWidth) <= (blocksArray[index].x + blocksArray[index].width))) {
                        return false;
                    }
                }
                break;
            case "left":
                if (blocksArray[index].x <= this.x - tankSpeed && this.x - tankSpeed <= blocksArray[index].x + blocksArray[index].width) {
                    if ((blocksArray[index].y <= this.y && this.y <= blocksArray[index].y + blocksArray[index].height) ||
                        (blocksArray[index].y <= this.y + tankLeft.spriteHeight + bullshit && this.y + tankLeft.spriteHeight + bullshit <= blocksArray[index].y + blocksArray[index].height)) {
                        return false;
                    }
                }
                break;
            case "right":
                if (blocksArray[index].x <= this.x + tankRight.spriteWidth + tankSpeed && this.x + tankRight.spriteWidth + tankSpeed <= blocksArray[index].x + blocksArray[index].width) {
                    if ((blocksArray[index].y <= this.y && this.y <= blocksArray[index].y + blocksArray[index].height) ||
                        (blocksArray[index].y <= this.y + tankRight.spriteHeight + bullshit && this.y + tankRight.spriteHeight + bullshit <= blocksArray[index].y + blocksArray[index].height)) {
                        return false;
                    }
                }
                break;
            default: break;
        }
    }
    return true;
}

// Tank.prototype.bulletCollision = function (where) {
//     for (var index = 0; index < blocksArray.length; index++) {
//         switch (where) {
//             case "up":
//                 if (blocksArray[index].y <= (this.bulletImage.currentY || ((this.y - tankUp.spriteHeight / 4) + bulletSpeed)) - bulletSpeed && (this.bulletImage.currentY || ((this.y - tankUp.spriteHeight / 4) + bulletSpeed)) - bulletSpeed <= (blocksArray[index].y + blocksArray[index].height)) {
//                     if ((blocksArray[index].x <= (this.bulletImage.currentX || (this.x + (tankUp.spriteWidth / 2) - (bulletDown.spriteWidth / 2))) && (this.bulletImage.currentX || (this.x + (tankUp.spriteWidth / 2) - (bulletDown.spriteWidth / 2))) <= (blocksArray[index].x + blocksArray[index].width)) ||
//                         (blocksArray[index].x <= ((this.bulletImage.currentX || (this.x + (tankUp.spriteWidth / 2) - (bulletDown.spriteWidth / 2))) + bulletUp.spriteWidth) && ((this.bulletImage.currentX || (this.x + (tankUp.spriteWidth / 2) - (bulletDown.spriteWidth / 2))) + bulletUp.spriteWidth) <= (blocksArray[index].x + blocksArray[index].width))) {
//                         return false;
//                     }
//                 }
//                 break;
//             case "down":
//                 if (blocksArray[index].y <= (this.bulletImage.currentY || (this.y + tankDown.spriteHeight + tankDown.spriteHeight / 4 - (bulletDown.spriteHeight + bulletSpeed))) + bulletDown.spriteHeight + bulletSpeed && (this.bulletImage.currentY || (this.y + tankDown.spriteHeight + tankDown.spriteHeight / 4 - (bulletDown.spriteHeight + bulletSpeed))) + bulletDown.spriteHeight + bulletSpeed <= (blocksArray[index].y + blocksArray[index].height)) {
//                     if ((blocksArray[index].x <= (this.bulletImage.currentX || this.x + (tankDown.spriteWidth / 2) - (bulletDown.spriteWidth / 2)) && (this.bulletImage.currentX || this.x + (tankDown.spriteWidth / 2) - (bulletDown.spriteWidth / 2)) <= (blocksArray[index].x + blocksArray[index].width)) ||
//                         (blocksArray[index].x <= ((this.bulletImage.currentX || this.x + (tankDown.spriteWidth / 2) - (bulletDown.spriteWidth / 2)) + bulletDown.spriteWidth) && ((this.bulletImage.currentX || this.x + (tankDown.spriteWidth / 2) - (bulletDown.spriteWidth / 2)) + bulletDown.spriteWidth) <= (blocksArray[index].x + blocksArray[index].width))) {
//                         return false;
//                     }
//                 }
//                 break;
//             case "left":
//                 if (blocksArray[index].x <= (this.bulletImage.currentX || (this.x - bulletLeft.spriteWidth) + bulletSpeed) - bulletSpeed && (this.bulletImage.currentX || (this.x - bulletLeft.spriteWidth) + bulletSpeed) - bulletSpeed <= blocksArray[index].x + blocksArray[index].width) {
//                     if ((blocksArray[index].y <= (this.bulletImage.currentY || this.y + (tankLeft.spriteHeight / 2 - bulletLeft.spriteHeight / 2)) && (this.bulletImage.currentY || this.y + (tankLeft.spriteHeight / 2 - bulletLeft.spriteHeight / 2)) <= blocksArray[index].y + blocksArray[index].height) ||
//                         (blocksArray[index].y <= (this.bulletImage.currentY || this.y + (tankLeft.spriteHeight / 2 - bulletLeft.spriteHeight / 2)) + bulletLeft.spriteHeight + bullshit && (this.bulletImage.currentY || this.y + (tankLeft.spriteHeight / 2 - bulletLeft.spriteHeight / 2)) + bulletLeft.spriteHeight + bullshit <= blocksArray[index].y + blocksArray[index].height)) {
//                         return false;
//                     }
//                 }
//                 break;
//             case "right":
//                 if (blocksArray[index].x <= this.bulletImage.currentX + bulletRIght.spriteWidth + bulletSpeed && this.bulletImage.currentX + bulletRIght.spriteWidth + bulletSpeed <= blocksArray[index].x + blocksArray[index].width) {
//                     if ((blocksArray[index].y <= (this.bulletImage.currentY || this.y + (tankRight.spriteHeight / 2 - bulletRIght.spriteHeight / 2)) && (this.bulletImage.currentY || this.y + (tankRight.spriteHeight / 2 - bulletRIght.spriteHeight / 2)) <= blocksArray[index].y + blocksArray[index].height) ||
//                         (blocksArray[index].y <= (this.bulletImage.currentY || this.y + (tankRight.spriteHeight / 2 - bulletRIght.spriteHeight / 2)) + bulletRIght.spriteHeight + bullshit && (this.bulletImage.currentY || this.y + (tankRight.spriteHeight / 2 - bulletRIght.spriteHeight / 2)) + bulletRIght.spriteHeight + bullshit <= blocksArray[index].y + blocksArray[index].height)) {
//                         return false;
//                     }
//                 }
//                 break;
//             default: break;
//         }
//     }
//     return true;
// }

Tank.prototype.bulletCollision = function (where) {
    for (var index = 0; index < blocksArray.length; index++) {
        switch (where) {
            case "up":
                if (blocksArray[index].y <= this.bulletImage.currentY - bulletSpeed && this.bulletImage.currentY - bulletSpeed <= (blocksArray[index].y + blocksArray[index].height)) {
                    if ((blocksArray[index].x <= this.bulletImage.currentX && this.bulletImage.currentX <= (blocksArray[index].x + blocksArray[index].width)) ||
                        (blocksArray[index].x <= this.bulletImage.currentX + bulletUp.spriteWidth && this.bulletImage.currentX + bulletUp.spriteWidth <= (blocksArray[index].x + blocksArray[index].width))) {
                        return false;
                    }
                }
                break;
            case "down":
                if (blocksArray[index].y <= this.bulletImage.currentY + bulletDown.spriteHeight + bulletSpeed && this.bulletImage.currentY + bulletDown.spriteHeight + bulletSpeed <= (blocksArray[index].y + blocksArray[index].height)) {
                    if ((blocksArray[index].x <= this.bulletImage.currentX && this.bulletImage.currentX <= (blocksArray[index].x + blocksArray[index].width)) ||
                        (blocksArray[index].x <= this.bulletImage.currentX + bulletDown.spriteWidth && this.bulletImage.currentX + bulletDown.spriteWidth <= (blocksArray[index].x + blocksArray[index].width))) {
                        return false;
                    }
                }
                break;
            case "left":
                if (blocksArray[index].x <= this.bulletImage.currentX - bulletSpeed && this.bulletImage.currentX - bulletSpeed <= blocksArray[index].x + blocksArray[index].width) {
                    if ((blocksArray[index].y <= this.bulletImage.currentY && this.bulletImage.currentY <= blocksArray[index].y + blocksArray[index].height) ||
                        (blocksArray[index].y <= this.bulletImage.currentY + bulletLeft.spriteHeight + bullshit && this.bulletImage.currentY + bulletLeft.spriteHeight + bullshit <= blocksArray[index].y + blocksArray[index].height)) {
                        return false;
                    }
                }
                break;
            case "right":
                if (blocksArray[index].x <= this.bulletImage.currentX + bulletRIght.spriteWidth + bulletSpeed && this.bulletImage.currentX + bulletRIght.spriteWidth + bulletSpeed <= blocksArray[index].x + blocksArray[index].width) {
                    if ((blocksArray[index].y <= this.bulletImage.currentY && this.bulletImage.currentY <= blocksArray[index].y + blocksArray[index].height) ||
                        (blocksArray[index].y <= this.bulletImage.currentY + bulletRIght.spriteHeight + bullshit && this.bulletImage.currentY + bulletRIght.spriteHeight + bullshit <= blocksArray[index].y + blocksArray[index].height)) {
                        return false;
                    }
                }
                break;
            default: break;
        }
    }
    return true;
}

var noobTank = new Tank((canvas.width / 2 - tankDown.spriteWidth / 2), 0, "down");
noobTank.image.addEventListener("load", function () {
    context.drawImage(noobTank.image, tankDown.x, tankDown.y,
        tankDown.spriteWidth, tankDown.spriteHeight,
        noobTank.x, noobTank.y,
        tankDown.spriteWidth, tankDown.spriteHeight);
}, false);


function chooseDirection() {
    var x = Math.floor(Math.random() * 4) + 1;
    switch (x) {
        case 1: x = "left"; break;
        case 2: x = "right"; break;
        case 3: x = "up"; break;
        case 4: x = "down"; break;
    }
    return x;
}
var moving;

function stoiTaGledai() {
    if (!noobTank.shotFiredLegit) {
        noobTank.shotFiredLegit = true;
        var x = noobTank.shoot.bind(noobTank);
        noobTank.currentBullet = setInterval(x, 1);
    }
}
setInterval(stoiTaGledai, 2000)
function moveIt() {
    if (moving) clearInterval(moving);
    var dir = chooseDirection();
    console.log(noobTank.currentPosition);
    while (noobTank.currentPosition == dir) {
        dir = chooseDirection();
    }
    console.log(dir);
    switch (dir) {
        case "left":
            moving = setInterval(noobTank.move.bind(noobTank, "left"), 50);
            break;
        case "right":
            moving = setInterval(noobTank.move.bind(noobTank, "right"), 50);
            break;
        case "up":
            moving = setInterval(noobTank.move.bind(noobTank, "up"), 50);
            break;
        case "down":
            moving = setInterval(noobTank.move.bind(noobTank, "down"), 50);
            break;
    }
}
setInterval(moveIt, 5000);
