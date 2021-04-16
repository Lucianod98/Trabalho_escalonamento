function round_robin(processos, quantum, qnt_processos){
    let lista1 = []
    let lista2 = []
    
    for (let i = 0; i < qnt_processos; i++){
        lista1.push(0)
        bt_restante = lista1
    }
    for (let i = 0; i < qnt_processos; i++){
        bt_restante[i] = processos[i][2]
    }
    for (let i = 0; i < qnt_processos; i++){
        lista2.push(0)
        wt = lista2
    }

    let tempo = 0 
    let overhead = 1 

    while (true){
        finalizados = true
        for (let i = 0; i < qnt_processos; i++){
            tempo += overhead
            if (bt_restante[i] > 0){
                finalizados = false

                if (bt_restante[i] > quantum){
                    tempo += quantum
                    bt_restante[i] -= quantum
                }
                else{ 
                    tempo += bt_restante[i]
                    wt[i] = tempo - processos[i][2]
                    bt_restante[i] = 0
                }
            }
        }
        if (finalizados == true){
            break
        }
    }
    return wt 
}

function turn_around_time(processos, wt,qnt_processos){
    /*let tat = [0] * processos.lenght */
    lista3 = []
    for (let i = 0; i < qnt_processos; i++){
        lista3.push(0)
    }
    let tat = lista3
    for (let i = 0; i < qnt_processos; i++){
        tat[i] = parseInt (processos[i][2] + wt[i])
    }
    return tat
}

function average_tat(processos){
    let qnt_proc = processos.length
    let tat = (turn_around_time(processos).reduce((a, b) => a + b,0))
    return (tat / qnt_proc)
}
    
function average_wt(processos){
    let qnt_proc = processos.length
    let waiting_time = round_robin(wt).reduce((a, b) => a + b,0)
    return (waiting_time / qnt_proc)
}

let processos = []
let p = "P"
console.log("Algoritmo Round Robin")
let qnt_processos = parseInt (prompt("Qnt de Processos: "))
for (let i = 0; i < qnt_processos; i++){
    let pid = p + i
    let at = parseInt (prompt("Arrival Time: "))
    let bt = parseInt (prompt("Burst Time: "))
    processos.push([pid, at, bt])
}


let quantum = parseInt (prompt("Informe o Quantum: "))

wt = round_robin(processos, quantum, qnt_processos)
tat = turn_around_time(processos, wt, qnt_processos)
avg_tat = average_tat(tat, qnt_processos)
avg_wt = average_wt(wt, qnt_processos)

console.log("WT =",wt,"\nTAT =",tat,"\nAVG_TAT =",avg_tat,"\nAVG_WT = ",avg_wt)


console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n")
for (let proc = 0; proc < processos.length; proc++){
    console.log(processos[proc][0],"\t\t\t",processos[proc][2],"\t\t\t",processos[proc][1],"\t\t\t",wt[proc],"\t\t\t"         ,tat[proc],"\t\t\t\n")
}
console.log("Average Waiting Time : ",avg_wt)
console.log("Average Turn-Around Time: ",avg_tat)