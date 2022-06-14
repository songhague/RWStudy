const canvas = document.
    querySelector('canvas')
const c =canvas.getContext('2d')

const scoreP = document.querySelector('#scoreP')
const HP = document.querySelector("#HP")
const GameStartBtn = document.querySelector('#GameStartBtn')
const SB = document.querySelector('#SB')
const GameOver = document.querySelector("#Over")
canvas.width = innerWidth
canvas.height= innerHeight

class Player{
    constructor(x,y,radius,color){
        this.x = x
        this.y=y
        this.radius=radius
        this.color=color
    }
    
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.
            radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill()
    }
}

class bullet{
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill()
    }

    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity = velocity
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill()
    }

    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x= canvas.width/2
const y= canvas.height/2

const player = new Player(x,y,30,'blue')
const bullets = []
const enemies = []

function spawnEnemies(){
    setInterval(()=>{
        const radius = Math.random()*(30-4)+4

        let x
        let y

        if(Math.random() < 0.5){
        x = Math.random() < 0.5 ? 0 - radius : canvas
            .width + radius
        y = Math.random() < 0.5 ? 0 - radius : canvas
            .height + radius
        }else{
        x = Math.random()*canvas.width
        y = Math.random() < 0.5 ? 0 - radius : canvas
            .height + radius
        }
  
        const color = 'green'

        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
        )
        const velocity = {
            x:Math.cos(angle),
            y:Math.sin(angle)
        }

        enemies.push(new Enemy(x,y,radius,color,velocity))
    },1000)
}
let hp = 5;
let animationId;
let score = 0;
function animate(){
    animationId =  requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    bullets.forEach((bullet)=>{
        bullet.update()
    })

    enemies.forEach((enemy,index)=>{
        enemy.update()

        const dist = Math.hypot(player.x-enemy.x,player.y-enemy.y)
        
        //end game , HP
        if(dist - enemy.radius - player.radius<1)
        {   
            
            if(enemy.radius > 10)
            {
                setTimeout(()=>{
                    enemies.splice(index,1)
                }, 0)
                hp-=2
                HP.innerHTML = hp
                console.log(hp)
                
            }
            if(enemy.radius < 10)
            {
                setTimeout(()=>{
                    enemies.splice(index,1)
                }, 0)
                hp-=1
                HP.innerHTML = hp
                console.log(hp)
                
            }
           if(hp<1)
            {
                HP.innerHTML = hp
               cancelAnimationFrame(animationId)
               GameOver.style.display = "block"
            }
             
        }

        bullets.forEach((bullet,bulletIndex)=>{
            const dist = Math.hypot(bullet.x-enemy.x,bullet.y-enemy.y)
        //적이 총알에 맞음
            if(dist - enemy.radius - bullet.radius<1)
            {
                if(enemy.radius -10 > 10)
                {
             
                    scoreP.innerHTML = score
                    console.log(score)
                    enemy.radius -=10
                    setTimeout(()=>{
                       
                        bullets.splice(bulletIndex,1)
                    }, 0)
                }else{
                    score +=50
                    scoreP.innerHTML = score
                setTimeout(()=>{
                    enemies.splice(index,1)
                    bullets.splice(bulletIndex,1)
                }, 0)
            }
            }
        })
    })
}

let count = 1
addEventListener('click',(event)=>{
    count++
    if(count%2){
        const angle =    Math.atan2(
            event.clientY - canvas.height / 2,
            event.clientX - canvas.width / 2
        )
        const velocity = {
            x:Math.cos(angle) *4,
            y:Math.sin(angle) *4  
        }
        bullets.push(
            new bullet(canvas.width / 2, canvas.height / 2,
                5,'red',velocity)
        )
    }
})
GameStartBtn.addEventListener('click',() => 
{
    animate()
    spawnEnemies()
    SB.style.display = 'none'
})