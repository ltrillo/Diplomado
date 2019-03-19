$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
      });
    } 
  });
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
});

var BTC = 0;
var BsS = 0;
var USD = 0;
var USD_BTC = 0;
var BsS_USD = 0;
var BTC_ONX = 0;
var BsS_BTC = 0;
var USD_ONX = 0;
var BsS_ONX = 0;

$.ajax({
	url: 'https://precio.onixcoin.com/api/v1/price/VEN/',
	success: function(respuesta) {
  BTC = respuesta.btc_onx_buy;
  BsS = respuesta.onx_bs_buy;
  USD = respuesta.usd_onx_buy;
  
  USD_BTC = USD / BTC;
  BsS_USD = BsS / USD;
  BTC_ONX = BTC;
  BsS_BTC = BsS / BTC;
  USD_ONX = BTC_ONX * USD_BTC;
  BsS_ONX = BsS_USD * USD_ONX;
//referencia de la API de precios de Onixcoin
  console.log("USD_BTC",USD_BTC, "BsS_USD",BsS_USD, "BTC_ONX", BTC_ONX, "BsS_BTC", BsS_BTC, "USD_ONX", USD_ONX, "BsS_ONX", BsS_ONX);
  console.log(respuesta, BTC, BsS, USD);
   
	},
	error: function() {
        console.log("No se ha podido obtener la información");
    }
});
//fecha actual y cálculo de la fecha de primera cuota 30 días después 
var fecha = new Date();
var fecha_cuota = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth()+1;// +1 porque enero es 0
var ano = fecha.getFullYear();
fecha_cuota.setDate(fecha_cuota.getDate() + 30);
fecha = (fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear());
fecha_cuota = (fecha_cuota.getDate() + "/" + (fecha_cuota.getMonth()+1) + "/" + fecha_cuota.getFullYear());
//referencia para comprobar las fechas
console.log("Fecha Actual", fecha, "+ 30 días =", fecha_cuota);
//evaluación del préstamo y envio de informacion al HTML cuando el usuario hace clic en el boton "calcular"
function calculaPrestamo() {
  var interes_mensual = 0.01;
  var cripto = document.getElementById("cripto").value;
  var aevaluar = document.getElementById("aevaluar").value;
  var monto = document.getElementById("monto").value;
  var plazo = document.getElementById("plazo").value;
  if (cripto == "Bitcoin (BTC)"){
    var tipoCripto = 0;
    window.alert("Los cálculos para prestamos con BTC no están disponibles");
  } else if (cripto == "OnixCoin (ONX)") {
    var tipoCripto = 1;
  }
  if (aevaluar == "Criptomonedas"){
    var tipoEvalua = 0;
  } else if (aevaluar == "Bolívares") {
    var tipoEvalua = 1;
    window.alert("Los cálculos en BsS para prestamos no están disponibles");
  }
  if (tipoCripto == 1 && tipoEvalua == 0 ) {

    pres_ONX = monto * 0.7;
    prestamo_ONX = pres_ONX.toFixed(8);
    pres_BsS = prestamo_ONX * BsS_ONX;
    prestamo_BsS = pres_BsS.toFixed(2);
    pres_BTC = prestamo_ONX * BTC_ONX;
    prestamo_BTC = pres_BTC.toFixed(8);
    pres_USD = prestamo_ONX * USD_ONX;
    prestamo_USD = pres_USD.toFixed(2);
    //muestro el monto del préstamo en todas sus equivalencias
    document.getElementById("prestamo_ONX").innerHTML = prestamo_ONX;
    document.getElementById("prestamo_BsS").innerHTML = prestamo_BsS;
    document.getElementById("prestamo_BTC").innerHTML = prestamo_BTC;
    document.getElementById("prestamo_USD").innerHTML = prestamo_USD;

    comi_ONX = prestamo_ONX * 0.03;
    comision_ONX = comi_ONX.toFixed(8);
    comi_BsS = comision_ONX * BsS_ONX;
    comision_BsS = comi_BsS.toFixed(2);
    comi_BTC = comision_ONX * BTC_ONX;
    comision_BTC = comi_BTC.toFixed(8);
    comi_USD = comision_ONX * USD_ONX;
    comision_USD = comi_USD.toFixed(2);
     //muestro el monto de la comisión flat en todas sus equivalencias
    document.getElementById("comision_ONX").innerHTML = comision_ONX;
    document.getElementById("comision_BsS").innerHTML = prestamo_BsS;
    document.getElementById("comision_BTC").innerHTML = prestamo_BTC;
    document.getElementById("comision_USD").innerHTML = prestamo_USD;
  
    gara_ONX = ((monto * 0.3) - comision_ONX);
    garantia_ONX = gara_ONX.toFixed(8);
    gara_BsS = garantia_ONX * BsS_ONX;
    garantia_BsS = gara_BsS.toFixed(2);
    gara_BTC = garantia_ONX * BTC_ONX;
    garantia_BTC = gara_BTC.toFixed(8);
    gara_USD = garantia_ONX * USD_ONX;
    garantia_USD = gara_USD.toFixed(2);
    //muestro el monto de la garantía en todas sus equivalencias
    document.getElementById("garantia_ONX").innerHTML = garantia_ONX;
    document.getElementById("garantia_BsS").innerHTML = garantia_BsS;
    document.getElementById("garantia_BTC").innerHTML = garantia_BTC;
    document.getElementById("garantia_USD").innerHTML = garantia_USD;
    //muestro la cantidad de cuotas seleccionadas para pagar o plazo
    document.getElementById("num_cuotas").innerHTML = plazo;
    
    capi_ONX = prestamo_ONX / plazo;
    capital_ONX = capi_ONX.toFixed(8);
    capi_BsS = capital_ONX * BsS_ONX;
    capital_BsS = capi_BsS.toFixed(2);
    capi_BTC = capital_ONX * BTC_ONX;
    capital_BTC = capi_BTC.toFixed(8);
    capi_USD = capital_ONX * USD_ONX;
    capital_USD = capi_USD.toFixed(2);
     //muestro el monto del capital en todas sus equivalencias
    document.getElementById("capital_ONX").innerHTML = capital_ONX;
    document.getElementById("capital_BsS").innerHTML = capital_BsS;
    document.getElementById("capital_BTC").innerHTML = capital_BTC;
    document.getElementById("capital_USD").innerHTML = capital_USD;

    inte_ONX = capital_ONX * interes_mensual;
    interes_ONX = inte_ONX.toFixed(8);
    inte_BsS = interes_ONX * BsS_ONX;
    interes_BsS = inte_BsS.toFixed(2);
    inte_BTC = interes_ONX * BTC_ONX;
    interes_BTC = inte_BTC.toFixed(8);
    inte_USD = interes_ONX * USD_ONX;
    interes_USD = inte_USD.toFixed(2);
    //muestro el monto de los intereses en todas sus equivalencias
    document.getElementById("interes_ONX").innerHTML = interes_ONX;
    document.getElementById("interes_BsS").innerHTML = interes_BsS;
    document.getElementById("interes_BTC").innerHTML = interes_BTC;
    document.getElementById("interes_USD").innerHTML = interes_USD;

    cuot_ONX = capi_ONX + inte_ONX;
    cuota_ONX = cuot_ONX.toFixed(8);
    cuot_BsS = cuot_ONX * BsS_ONX;
    cuota_BsS = cuot_BsS.toFixed(2);
    cuot_BTC = cuot_ONX * BTC_ONX;
    cuota_BTC = cuot_BTC.toFixed(8);
    cuot_USD = cuot_ONX * USD_ONX;
    cuota_USD = cuot_USD.toFixed(2);
    //muestro el monto de la cuota en todas sus equivalencias
    document.getElementById("cuota_ONX").innerHTML = cuota_ONX;
    document.getElementById("cuota_BsS").innerHTML = cuota_BsS;
    document.getElementById("cuota_BTC").innerHTML = cuota_BTC;
    document.getElementById("cuota_USD").innerHTML = cuota_USD;
   
    document.getElementById("date").innerHTML = fecha;//muestro la fecha actual
    document.getElementById("fecha_cuota").innerHTML = fecha_cuota;//muestro la fecha de la primera cuota
  }
//referencia para usar parámetros para realizar los cálculos
  console.log(cripto, tipoCripto, aevaluar, tipoEvalua,monto, plazo);
}
//modal de registro
var modal = document.getElementById('id01');
// cierra el modal al hacer clic en cualquier parte fuera del modal
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
  }
}

 