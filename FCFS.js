let processos = []

function waiting_time(processos){ 
    lista2 = []
    for (let i = 0; i < processos.length; i++){
      lista2.push(0)
    }
    let wt = lista2

    lista3 = []
    for (let i = 0; i < processos.length; i++){
      lista3.push(0)
    }
    tempo_servico = lista3
    tempo_servico[0] = 0
    for (let i = 1; i < processos.length; i++){
        tempo_servico[i] = parseInt (tempo_servico[i-1] + processos[i-1][1])
        wt[i] = parseInt (tempo_servico[i] - processos[i][0])
        if (wt[i] < 0){
            wt[i] = 0
        }
    }
return wt
}

function turn_around_time(processos){
    lista1 = []
    for (let i = 0; i < processos.length; i++){
        lista1.push(0)
    }
    let tat = lista1
    let wt = waiting_time(processos)
    for (let i = 0; i < processos.length; i++){
        tat[i] = parseInt (processos[i][1] + wt[i])
    }
    return tat
}
function average_wt(processos){
    let qnt_proc = processos.length
    let wt = waiting_time(processos).reduce((a, b) => a + b,0)
    return (wt / qnt_proc)
}
function average_tat(processos){
    let qnt_proc = processos.length
    let tat = (turn_around_time(processos).reduce((a, b) => a + b,0))
    return (tat / qnt_proc)
}

let qnt_processos = parseInt (prompt("Qnt de Processos: "))
for (let i = 0; i < qnt_processos; i++){
    at = parseInt (prompt("Arrival Time: "))
    bt = parseInt (prompt("Burst Time: "))
    processos.push([at, bt])
}

console.log("Process\tBurst Time\tArrival Time\tWaiting Time\tTurn-Around Time\tCompletion Time","\n")
let wt = waiting_time(processos)
let tat = turn_around_time(processos)
let avg_wt = average_wt(processos)
let avg_tat = average_tat(processos)

for (let proc = 0; proc < processos.length; proc++){
    console.log(proc,"\t\t",processos[proc][1],"\t\t",processos[proc][0],"\t\t",wt[proc],"\t\t",tat[proc],"\t\t",tat[proc] + processos[proc][0],"\n")
}
console.log("Average Waiting Time : ",avg_wt)
console.log("Average Turn-Around Time: ",avg_tat)