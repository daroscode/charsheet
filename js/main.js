//Making it pwa
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(){
        console.log('ServiceWorker registered');
    });
}

$(".data-options-global").css("display", "none");

$(document).ready(function() {

    if (pdbufftotal.val() == 0 && pdtotal.val() == 0) {
        mchtotal.css("color", "red");
        mcatotal.css("color", "red");
        matotal.css("color", "red");
        mmtotal.css("color", "red");
    }

    if ($("#char-name").html() == "" || $("#char-name").html() == undefined) {
        let character = prompt("Qual o nome do seu Personagem?", "");
        $("#char-name").html(character);
    }
});

var pltotal = $("#pl-total");
var petotal = $("#pe-total");
var pdtotal = $("#pd-total");
var pdbufftotal = $("#pd-buff-total");
var atqtotal = $("#atq-total");
var deftotal = $("#def-total");
var mchtotal = $("#mch-total");
var mcatotal = $("#mca-total");
var matotal = $("#ma-total");
var mmtotal = $("#mm-total");

function arrowUp (arrow) {
    let _self = $(arrow);
    let numberCounter = _self.closest(".inner-block, .inner-block-table").find("input");
    let number = numberCounter.val();
    number++;  
    if (numberCounter.val() < number || numberCounter.val() == "" || numberCounter.val() == undefined) {
        numberCounter.val(number);
    }
}

function arrowDown (arrow) {
    let _self = $(arrow);
    let numberCounter = _self.closest(".inner-block, .inner-block-table").find("input");
    let number = numberCounter.val();
    number--;  
    if (numberCounter.val() > number || numberCounter.val() == "" || numberCounter.val() == undefined) {
        numberCounter.val(number);
    }
}

// Arrow up callback
$("#pl-arrow-up, #pe-arrow-up, #atq-arrow-up, #def-arrow-up, #pd-arrow-up, #pd-buff-arrow-up, #mch-arrow-up, #mca-arrow-up, #ma-arrow-up, #mm-arrow-up").click(function() {
    arrowUp($(this));
});

// Arrow down callback
$("#atq-arrow-down, #def-arrow-down, #pd-arrow-down, #pd-buff-arrow-down, #mch-arrow-down, #mca-arrow-down, #ma-arrow-down, #mm-arrow-down").click(function() {
    arrowDown($(this));
});

// Arrow down callback in case of Life and Energy
$("#pl-arrow-down, #pe-arrow-down").click(function() {
    arrowDown($(this));
    var pdatual;

    if (pdbufftotal.val() == 0) {
        pdbufftotal.val("0");  
        if (pdtotal.val() == 0) {
            pdtotal.val("0"); 
        } else {
            pdatual = pdtotal.val();
            pdatual--;
            pdtotal.val(pdatual);  
        }
    } else {
        pdatual = pdbufftotal.val();
        pdatual--;
        pdbufftotal.val(pdatual);
    }

    if (pdbufftotal.val() == 0 && pdtotal.val() == 0) {
        mchtotal.css("color", "red");
        mcatotal.css("color", "red");
        matotal.css("color", "red");
        mmtotal.css("color", "red");
    }
    
});

$("#pd-arrow-up, #pd-buff-arrow-up").click(function() {
    mchtotal.css("color", "black");
    mcatotal.css("color", "black");
    matotal.css("color", "black");
    mmtotal.css("color", "black");
});

$("#pd-arrow-down, #pd-buff-arrow-down").click(function() {
    if (pdbufftotal.val() == 0 && pdtotal.val() == 0) {
        mchtotal.css("color", "red");
        mcatotal.css("color", "red");
        matotal.css("color", "red");
        mmtotal.css("color", "red");
    }

    if (pdtotal.val() == 0) {
        pdtotal.val("0");  
        return false; 
    }

    if (pdbufftotal.val() == 0) {
        pdbufftotal.val("0"); 
        return false; 
    }

});

// Data saving
$("#btnSaveSheet").click(function() {

    var data = {};
    data.Character = $("#char-name").html();
    data.PLTotal = pltotal.val();
    data.PETotal = petotal.val();
    data.PDTotal = pdtotal.val();
    data.PDBuffTotal = pdbufftotal.val();
    data.ATQTotal = atqtotal.val();
    data.DEFTotal = deftotal.val();
    data.MCHTotal = mchtotal.val();
    data.MCATotal = mcatotal.val();
    data.MATotal = matotal.val();
    data.MMTotal = mmtotal.val();

    data.isProcessed = false;
  
    localStorage.setItem("myData", JSON.stringify(data));
    $("#btnDeleteSheet").prop("disabled",false);
    alert("Ficha salva com sucesso!");
    location.reload(); 
});

//On page load
var data = localStorage.getItem("myData");
var dataObject;

if (data != null) {
    dataObject = JSON.parse(data);
    $("#char-name").html(dataObject.Character);
    pltotal.val(dataObject.PLTotal);
    petotal.val(dataObject.PETotal);
    pdtotal.val(dataObject.PDTotal);
    pdbufftotal.val(dataObject.PDBuffTotal);
    atqtotal.val(dataObject.ATQTotal);
    deftotal.val(dataObject.DEFTotal);
    mchtotal.val(dataObject.MCHTotal);
    mcatotal.val(dataObject.MCATotal);
    matotal.val(dataObject.MATotal);
    mmtotal.val(dataObject.MMTotal);
} else {
    $("#btnDeleteSheet").prop("disabled",true);
}

// Delete content
$("#btnDeleteSheet").click(function() {
    localStorage.removeItem("myData");
    location.reload();  
});

// Export content
$("#btnExportSheet").click(function() {
    var link = document.createElement('a'); 
    var data = {};
    const charData = [
        {
            CharacterName: $("#char-name").html(),
            PLTotal: pltotal.val(),
            PETotal: petotal.val(),
            PDTotal: pdtotal.val(),
            PDBuffTotal: pdbufftotal.val(),
            ATQTotal: atqtotal.val(),
            DEFTotal: deftotal.val(),
            MCHTotal: mchtotal.val(),
            MCATotal: mcatotal.val(),
            MATotal: matotal.val(),
            MMTotal: mmtotal.val()
        },
    ];
    const titleKeys = Object.keys(charData[0]);
    const refinedData = [];
    refinedData.push(titleKeys);
    charData.forEach(item => {
        refinedData.push(Object.values(item))  
    });
    
    let csvContent = ''
    refinedData.forEach(row => {
    csvContent += row.join(',') + '\n'
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
    const objUrl = URL.createObjectURL(blob);
    link.setAttribute('href', objUrl);
    link.setAttribute('download', 'character-sheet-'+ $("#char-name").html() +'.csv')
    link.click();
    location.reload(); 
});

// Open Data options
$(".data-options-bottom").click(function() {
    $(".data-options-global").fadeIn().css("display", "block");
});

$(".data-options").click(function() {
    $(".data-options-global").fadeOut().css("display", "none");
});
