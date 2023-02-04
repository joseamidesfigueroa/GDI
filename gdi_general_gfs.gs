#===========================================================================================
#===========================================================================================
#================ CALCULO DEL INDICE DE CONVECCIÓN GALVEZ DAVISON ( GDI )===================
#============================= INFORMACIÓN ACERCA DEL INDICE: ==============================
#===================== http://www.wpc.ncep.noaa.gov/international/gdi/ =====================
#========================== IMPLEMENTACION DEL ALGORITMO A GRADS: ==========================
#====================== Juan Jose Amides Figueroa Urbano / El Salvador =====================
#==================== juanjosefigueroa@gmail.com & juanfigueroa@marn.gob.sv ================
#================================   30/04/2014 01:45 UTC   =================================
#===========================================================================================
#===========================================================================================

#===========================================================================================
#===========================================================================================
#================ CALCULATION OF GALVEZ DAVISON INDEX ( GDI ) FOR CONVECTION ===============
#============================== MORE INFO ABOUT THE INDEX IN: ==============================
#===================== http://www.wpc.ncep.noaa.gov/international/gdi/ =====================
#============================= GRADS INDEX IMPLEMENTATION FOR: =============================
#====================== Juan Jose Amides Figueroa Urbano / El Salvador =====================
#==================== juanjosefigueroa@gmail.com & juanfigueroa@marn.gob.sv ================
#================================   30/04/2014 01:45 UTC   =================================
#===========================================================================================
#===========================================================================================

#============================================================================================

#                                       (`-`;-"```"-;`-`) 
#                                        \.'         './
#                                        /             \
#                                        ;   0     0   ;
#                                       /| =         = |\
#                                      ; \   '._Y_.'   / ;
#                                     ;   `-._ \|/ _.-'   ;
#                                    ;        `"""`        ;
#                                    ;    `""-.   .-""`    ;
#                                    /;  '--._ \ / _.--   ;\
#                                   :  `.   `/|| ||\`   .'  :
#                                    '.  '-._       _.-'   .'
#                                    (((-'`  `"""""`   `'-)))
#
#                             SE BUEN HAMSTER Y LEE ANTES DE CORRER 
#                             BE A GOOD HAMSTER AND READ BEFORE RUN


#===================================  NOTA DE USO  ==========================================
# Toda modificación, uso y reproducción está permitida, solo se agradece citar la fuente.
# las siguientes lineas calculan el GDI a partir de dos variables principales a diferentes
# niveles en la vertical, necesitas cambiar el nombre de las variables para que funcione,
# el codigo fue desarrollado para ser utilizado con la salida del WRF ARW version 3.2.1 
# post procesadas mediante la herramienta ARWpost para su transformacion al formato GRADS
# el codigo aqui provisto ha sido probado y es 100% funcional, si tienes algun problema te 
# sugiero que revises nuevamente el nombre de las variables, las variables utilizadas para 
# el caso particular del WRF El Salvador son "theta" para la temperatura equivalente potencial
# y spfhprs para la razon de mezcla del vapor de agua.
#
# La programacion actual usa 72 horas de pronostico y envia las salidas graficas a un destino
# en la computadora, la ruta debe existir, mi sugerencia es que antes de intentar el codigo 
# leas todas las lineas para hacer los cambios correspondientes.
#
# SUGERENCIA: 
# Si no sabes el nombre de las variables puedes usar el comando "q file" en GrADS para ver 
# el nombre correcto de las variables disponibles.
#
# MUY IMPORTANTE!!!
# PARA USAR LA FUNCION "color.gs" COMO SE HACE EN ESTE CODIGO NECESITAS DESCARGARLO DESDE AQUI: 
# http://kodama.fubuki.info/printimki/printimki.cgi/GrADS/script/color.gs?lang=en
# ============================================================================================

#===================================  NOTE OF USE  ===========================================
# All modifications, use and reproduction is permitted, only mention the source.
# the next lines calculates the GDI from two principal variables at different s levels in 
# the vertical, you need change the variables names to work in your system if you don't work
# printimt WRF ARW, the code was developed to be used printimth the WRF ARW model in version 3.2.1
# post processed printimth ARWpost tool for to be used printimth GrADS, the code here was proved and
# tested and is 100% functional, if you have problems i suggest you double check the variables
# names again, the variables names used for my case are: "theta" for the Potential Equivalent
# Temperature and "spfhprs" for water vapor mixing ratio.
#
# The actual code use 72 hours of forecast available from WRF output and send the graphic product
# to a location in your computer, the route of destiny must exist, my suggest is read all the
# code before try to run it to do the necessary changes.
#
# SUGEST: 
# If you don't know variables names for your case you can use the command "q file" in GrADS 
# to see the available variables names.
#
# VERY IMPORTANT!!!!
# TO USE THE "color.gs" FUNCTION YOU NEED TO DOWNLOAD AND PUT IN THE SAME DIRECTORY IN YOU RUNNING 
# GrADS, DOWNLOAD IT FROM HERE: http://kodama.fubuki.info/printimki/printimki.cgi/GrADS/script/color.gs?lang=en
# ===========================================================================================

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%% PRINCIPIO DEL CICLO PARA GENERAR 7 DIAS DE PRONOSTICO %%%%
#%%%%%%%%%%%% START 7 DAYS FORECAST HOURS OF CICLE %%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

t=1
#%%%%%%%%%%% DEFINICION DE LAS HORAS DE PRONOSTICO %%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%% SET THE FORECAST HOURS %%%%%%%%%%%%%%%%%%%
while (t <= 65)

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%%% PREPACION DEL MAPA %%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%% PREPARE THE MAP %%%%%%%%%%%%%%%%%%%%%%%%%

'set xsize 1400 1050'
'set mpdset hires'
'set display color white'
'set gxout shaded'

#<<----------------------------------------------------------->>

'set t 't''

#%%%%%%%%%%%%%%%%% DEFINICION DE VARIABLES  %%%%%%%%%%%%%%%%%%
#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%% VARIABLES EN 950 HPA  %%%%%%%%%%%%%%%%%%
#OBTIENE LA PRESION A NIVEL DE SUPERFICIE Y DEFINE VARIABLES 
#PARA FACILITAR LOS CALCULOS...

# QUIZA NECESITES CAMBIAR ESTO!!!
# pressfc = Presion al nivel de superficie para mi en Pascales pero para el
#        GDI necesita estar en Hecto Pascales

# MAYBE YOU NEED CHANGE THIS!!!
# pressfc = Surface level pressure in Pascals for me but for the GDI need
#        to be in Hecto Pascals

'ps=pressfc/100'
#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%% VARIABLES EN 950 HPA  %%%%%%%%%%%%%%%%%%
'set lev 950'

# QUIZA NECESITES CAMBIAR ESTO!!!
# tmpprs = Temperatura en K 
# spfhprs = Humedad específica

# MAYBE YOU NEED CHANGE THIS!!!
# tmpprs = Equivalent Potential Temperature
# spfhprs = Specific Humidity

'T950=((tmpprs)*(pow((1000/950),(2/7))))'
'R950=spfhprs'
'Temp950=tmpprs'
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%% VARIABLES EN 850 HPA  %%%%%%%%%%%%%%%%%%

# QUIZA NECESITES CAMBIAR ESTO!!!
# theta = Temperatura en K 
# spfhprs = Razon de Mezcla de vapor de agua

# MAYBE YOU NEED CHANGE THIS!!!
# theta = Equivalent Potential Temperature
# spfhprs = Water Vapor Mixing Ratio

'set lev 850'
'T850=((tmpprs)*(pow((1000/850),(2/7))))'
'R850=spfhprs'
'Temp850=tmpprs'
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%% VARIABLES EN 700 HPA  %%%%%%%%%%%%%%%%%%

# QUIZA NECESITES CAMBIAR ESTO!!!
# theta = Temperatura en K 
# spfhprs = Razon de Mezcla de vapor de agua

# MAYBE YOU NEED CHANGE THIS!!!
# theta = Equivalent Potential Temperature
# spfhprs = Water Vapor Mixing Ratio

'set lev 700'
'T700=((tmpprs)*(pow((1000/700),(2/7))))'
'R700=spfhprs'
'Temp700=tmpprs'
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%% VARIABLES EN 500 HPA  %%%%%%%%%%%%%%%%%%

# QUIZA NECESITES CAMBIAR ESTO!!!
# theta = Temperatura en K 
# spfhprs = Razon de Mezcla de vapor de agua

# MAYBE YOU NEED CHANGE THIS!!!
# theta = Equivalent Potential Temperature
# spfhprs = Water Vapor Mixing Ratio

#Variables de 500 hPa
'set lev 500'
'T500=((tmpprs)*(pow((1000/500),(2/7))))'
'R500=spfhprs'
'Temp500=tmpprs'
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%% CALCULO DE GRADIENTES Y RAZONES DE MEZCLA %%%%%%%%%%%%%%

'THETAA=T950'
'A1=T850+T700'
'THETAB=0.5*A1'
'THETAC=T500'
'RA=R950'
'C2=R850+R700'
'RB=0.5*C2'
'RC=R500'

#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%%%%% CALCULO DE PROXIES  %%%%%%%%%%%%%%%%%%%

'L0=2690000'
'alpha=-10'
'cpd=1005.7'
'p1=L0*RA'
'p2=L0*RB'
'p3=L0*RC'
'p4=cpd*T850'
'x1=p1/p4'
'x2=p2/p4'
'x3=p3/p4'
'y1=exp(x1)'
'y2=exp(x2)'
'y3=exp(x3)'
'EPTPA=THETAA*y1'
'EPTPB=THETAB*y2+alpha'
'EPTPC=THETAC*y3+alpha'
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%%%%% CALCULO DEL ECI  %%%%%%%%%%%%%%%%%%%

'beta=303'
'ME=EPTPC-beta'
'LE=EPTPA-beta'
'gamma=0.065'

#Decide a cuanto equivale el ECI

if (LE<=0)
   'ECI=0'
else
   'ECI=gamma*LE*ME'
endif
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%%%%% CALCULO DEL Mprintim  %%%%%%%%%%%%%%%%%%%

'tau=263.15'
'mu=-7'

'prueba1=Temp500-tau'
if (prueba1<=0)
   'Mprintim=0'
else
   'Mprintim=(prueba1*mu)'
endif
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%%%%%%%%%%%%%% CALCULO DEL II  %%%%%%%%%%%%%%%%%%%

'sigma=1.5'
'op1=T950-T700'
'S=sigma*op1'
'op2=EPTPB-EPTPA'
'D=sigma*op2'
'prueba2=D+S'
if (prueba2<=0)
   'II=D+S'
else
   'II=0'
endif
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%% CALCULO DE LA CORRECCION PARA GRAFICOS  %%%%%%%%%

'pp1=500'
'pp2=9000'
'pp3=18'
'divisor=ps-pp1'
'division=pp2/divisor'
'C0=pp3-division'


#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
#%%%%%%%% CALCULO DEL INDICE CON Y SIN CORRECCION  %%%%%%%%%

'GDI=ECI+Mprintim+II'
'GDIc=ECI+Mprintim+II+C0'
#<<----------------------------------------------------------->>

#<<----------------------------------------------------------->>
############################################################
############################################################
###### GENERACION DE IMAGENES DEL GDI CADA HORA ############
############################################################
############################################################

'set gxout shaded'
'c'
'color -30 70 5 -kind black->dimgray->gray->darkgray->silver->lightblue->limegreen->gold->darkorange->crimson->maroon'
'd GDIc'
'cbarn'
'set gxout contour'
'set ccolor 0'
'd GDIc'
'set gxout contour'
'set ccolor 0'
#'d GDIc'
'set ccolor 11'
'set gxout stream'
'set lev 850'
'd ugrdprs*1.94;vgrdprs*1.94'
'q time'
x1=sublin(result,1)
t1=subwrd(x1,3)
tb=subwrd(x1,3)
t2=subwrd(x1,5)
'draw title GDI PARA CADA HORA 't1' '
'draw string 4.5 0.2 WRF El Salvador'
'printim /home/ccpm_server/trabajo/grads_temp/gdi/'t'.png x1920 y1440'
#'printim 't'.png x1400 y1050'

#<<----------------------------------------------------------->>
#%%%%% COMIENZA ALMACENAJE DE GDI PARA CALCULOS POSTERIORES %%%%

'GDI't'=GDIc'

#<<----------------------------------------------------------->>

t=t+1
'reset'
endwhile
#<<----------------------------------------------------------->>
