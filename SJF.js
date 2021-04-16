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
    for (let i = 1; i < processos.length; i++){
        tempo_servico[i] = parseInt (tempo_servico[i-1] + processos[i-1][2])
        wt[i] = parseInt (tempo_servico[i] - processos[i][1])
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
    let wt = waiting_time(processos).reduce((a, b) => a + b,0)
    return (wt / qnt_proc)
}

function SJF(processos){
    for (x = 0; x < processos.length; x++){
        for (i = 0; i < processos.length - 1; i++){
            if (processos[i][2] > processos[i+1][2]){
                processos[i], processos[i+1] = processos[i+1], processos[i]
            }
        }
    }
    return processos
}

console.log(":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::")

let processos = []
let p = "P"
let qnt_processos = parseInt (prompt("Quantidade de processos: "))
for (let i = 0; i < qnt_processos; i++){
    let pid = p + i
    let at = parseInt (prompt("Arrival Time: "))
    let bt = parseInt (prompt("Burst Time: "))
    processos.push([pid, at, bt])
}

let wt = waiting_time(processos)
let tat = turn_around_time(processos)
let avg_wt = average_wt(processos)
let avg_tat = average_tat(processos)


console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n")
for (let proc = 0; proc < processos.length; proc++){
    console.log(processos[proc][0],"\t\t",processos[proc][2],"\t\t",processos[proc][1],"\t\t",wt[proc],"\t\t",tat[proc],"\t\t",tat[proc] + processos[proc][1],"\n")
}

console.log("Average Waiting Time : ",avg_wt)
console.log("Average Turn-Around Time: ",avg_tat)

console.log("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n")

processos = SJF(processos)
wt = waiting_time(processos)
tat = turn_around_time(processos)
avg_wt = average_wt(processos)
avg_tat = average_tat(processos)
console.log(processos)

console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n")
for (let proc = 0; proc < processos.length; proc++){
    console.log(processos[proc][0],"\t\t",processos[proc][2],"\t\t",processos[proc][1],"\t\t",wt[proc],"\t\t",tat[proc],"\t\t",tat[proc] + processos[proc][1],"\n")
}

console.log("Average Waiting Time : ",avg_wt)
console.log("Average Turn-Around Time: ",avg_tat)
