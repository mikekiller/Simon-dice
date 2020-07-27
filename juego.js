const btnEmpezar = document.getElementById('btnEmpezar')
const rojo  = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const verde = document.getElementById('verde')
const azul = document.getElementById('azul')
const Ultimo_nivel = 10
const comando = document.getElementById('comando')
const puntuacion = document.getElementById('puntuacion')
const puntuacionA = document.getElementById('puntuacionA')
var puntuacionAlta = 0

/* constantes para los sonidos */
const sound_rojo =  document.getElementById('sound_do')
const sound_amarillo =  document.getElementById('sound_re')
const sound_verde =  document.getElementById('sound_mi')
const sound_azul =  document.getElementById('sound_fa')
const sound_sol =  document.getElementById('sound_sol')

class Juego{

    constructor (){

        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1500)
        
    }

    inicializar(){

       this.cambiarComandoins()
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.agregarEventosclick =  this.agregarEventosclick.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            rojo, 
            amarillo, 
            verde, 
            azul
        }
        this.desactivarBoton()
        this.puntuacion = 0
       this.sonidos= {
        sound_rojo, sound_amarillo, sound_verde, sound_azul, sound_sol
       }
              
    }
    cambiarComando(){
        var cc = 'Mirar'
        comando.innerHTML = cc
    }
    cambiarComandoins(){
        var cc = 'Instrucciones'
        comando.innerHTML = cc
    }
    cambiarComandoJugar(){
        var cc = 'Jugar'
        comando.innerHTML = cc
    }
    desactivarBoton(){
       btnEmpezar.disabled = true
    }
    ActivarBoton(){
        btnEmpezar.disabled = false
    }
    toggleBtnEmpezar(){
        btnEmpezar.classList.toggle('hide')  
    }
    
    generarSecuencia(){
        this.secuencia  = new Array(Ultimo_nivel).fill(0).map( n => Math.floor(Math.random() * 4 ))
    }
    siguienteNivel(){
    
        this.subnivel = 0
        this.cambiarComando()
        this.iluminarSecuencia()
        setTimeout(this.agregarEventosclick, 1000 * this.nivel)
        setTimeout(this.cambiarComandoJugar, 1000 * this.nivel) 
    }
    iluminarSecuencia(){
        for(let i = 0 ; i< this.nivel ;i++){
           const color  = this.transformarAcolor(this.secuencia[i]) ;
           setTimeout(()=> this.iluminarColor(color), 1000*i)     
        }
    }
    transformarAcolor(numero){
        switch(numero){
            case 0:
                return 'rojo'
            case 1 :
                return 'amarillo'
            case 2 :
                return 'verde'
            case 3 :
                return 'azul'
        }
    }
    transformarColorAnumero(color){
        switch(color){
            case 'rojo':
                return 0
            case 'amarillo' :
                return 1
            case 'verde' :
                return 2
            case 'azul' :
                return 3
        }
    }
   

    iluminarColor(color){
        this.colores[color].classList.add('light') 
        setTimeout(()=> this.apagarColor(color), 350)
        this.reproducirSonido(`sound_${color}`)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    reproducirSonido(color_sonido){
        this.sonidos[color_sonido].play()
    }
    agregarEventosclick(){
        this.colores.rojo.addEventListener('click',this.elegirColor)
        this.colores.amarillo.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
        this.colores.azul.addEventListener('click',this.elegirColor)
    }
    eliminarEventosclick(){
        this.colores.rojo.removeEventListener('click',this.elegirColor)
        this.colores.amarillo.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
        this.colores.azul.removeEventListener('click',this.elegirColor)
    }
    elegirColor(ev){ 
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorAnumero(nombreColor)
        

        this.iluminarColor(nombreColor)
       
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            
            if(this.subnivel == this.nivel){
                this.nivel++
                this.eliminarEventosclick()

                this.puntuacion = this.puntuacion + 2
                puntuacion.innerHTML =  `Puntuacion : ${this.puntuacion}`

                if(this.nivel == (Ultimo_nivel + 1)){
                    this.ganoEljuego()
                }else{
                    
                    setTimeout(this.cambiarComando, 1200)
                    setTimeout(this.siguienteNivel, 1500)
                    
                }
            }
        }else{
            this.perdioEljuego()
        }
    }
    ganoEljuego(){
        swal('Ganaste','Felicitaciones','success')
        .then(this.inicializar)
    }
    perdioEljuego(){
        
        this.PuntuacionAlta()
        swal('Perdiste','Lo sentimos :)','error')
        .then(()=> {
            this.eliminarEventosclick()
            this.inicializar()
            this.ActivarBoton()
        })
        setTimeout(this.reproducirSonido('sound_sol'), 2000)
      
       
    }
    PuntuacionAlta(){

        if(this.puntuacion > puntuacionAlta){
            puntuacionAlta = this.puntuacion
            puntuacionA.innerHTML = `Puntuacion mas Alta : ${puntuacionAlta}`
        }
        puntuacion.innerHTML = `Puntuacion : 0`
        this.puntuacion = 0 
        
    }
}
function empezarjuego(){
    window.juego = new Juego();
    
}