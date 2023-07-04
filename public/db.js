'use strict'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            //aqui você faz a conexão com o banco
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        import {getDatabase,ref,get,set,child,update,remove,onValue}
        from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

        const firebaseApp = initializeApp(firebaseConfig);
        const URL = "https://portifolio-9c302-default-rtdb.firebaseio.com/";
        const db = getDatabase();
        
        var ID = 1;
        var tbody = document.getElementById('tbody');
        var tbodyProj = document.getElementById('tbodyProj')

        //Pegar todos os dados do banco e adiciona em um vetor
        function GetAllDataRT(){

            const dbRef = ref(db,"portiflio/certificado");
            onValue(dbRef,(snapshot)=>{
                var certificado = [];
                snapshot.forEach(childSnapshot =>{
                    certificado.push(childSnapshot.val());
                });
                //console.log(certificado);
                AddAll(certificado);
            });

            const dbRefProj = ref(db,"portiflio/projeto");
            onValue(dbRefProj,(snapshot)=>{
                var projeto = [];
                snapshot.forEach(childSnapshot =>{
                    projeto.push(childSnapshot.val());
                });
                //console.log(projeto);
                AddAllProj(projeto);
            });

            
        }
        
        window.onload = GetAllDataRT;

        // Separa cada elemento do snapshot e envia para as funcões AddItemTb e AddItemTbProj
        function AddAll(certificado){
            ID=0;
            tbody.innerHTML="";

            certificado.forEach(element => {
                AddItemTb(element.ArquivoURL,element.Curso,element.ImgURL,element.Mes,element.Nivel,element.ano,element.inst);
            });
        }

        function AddAllProj(projeto){
            tbodyProj.innerHTML="";
            projeto.forEach(element => {
                AddItemTbProj(element.Projeto,element.tecnologia,element.descricao,element.link_projeto,element.ImgURL);
            });
        }

        // Exibi as informações do banco no site criando um HTML para cada snapshot
        function AddItemTb(ArquivoURL,Curso,ImgURL,Mes,Nivel,ano,inst){
            let fieldset = document.createElement('div');
            let td1 = document.createElement('tr');
            let td2 = document.createElement('tr');
            let td3 = document.createElement('tr');
            let td4 = document.createElement('tr');
            let td5 = document.createElement('tr');
            let td6 = document.createElement('tr');
            
            td1.innerHTML='<center><img src="'+ImgURL+'" id="myimg" height="200" width="200"></center>';
            td2.innerHTML='<label style="color: white; padding-left: 5%;">Nome do Curso: '+Curso+'</label>';
            td3.innerHTML='<label style="color: white; padding-left: 5%;">Nivel: '+Nivel+'</label>';
            td4.innerHTML='<label style="color: white; padding-left: 5%;">Instituição: '+inst+'</label>';
            td5.innerHTML='<label style="color: white; padding-right: 1%; padding-left: 5%;">Data da Conclusão: '+Mes+'/'+ano+'</label>';
            td6.innerHTML='<a href="'+ArquivoURL+' "style = "padding-left: 5%;" target="_blank" rel="noopener noreferrer">Visualizar certificado</a>';

            fieldset.appendChild(td1);
            fieldset.appendChild(td2);
            fieldset.appendChild(td3);
            fieldset.appendChild(td4);
            fieldset.appendChild(td5);
            fieldset.appendChild(td6);
            tbody.appendChild(fieldset);
        }

        function AddItemTbProj(Projeto,tecnologia,descricao,link_projeto,ImgURL){   
            
            let fieldsetP = document.createElement('div');
            let tdP1 = document.createElement('tr');
            let tdP2 = document.createElement('tr');
            let tdP3 = document.createElement('tr');
            let tdP4 = document.createElement('tr');
            let tdP5 = document.createElement('tr');


            tdP1.innerHTML='<center><img src="'+ImgURL+'" id="myimg" height="200" width="200"></center>';
            tdP2.innerHTML='<label style="color: white; padding-left: 5%;">Nome do Projeto: '+Projeto+'</label>';
            tdP3.innerHTML='<label style="color: white; padding-left: 5%;">Tecnologia: '+tecnologia+'</label>';
            tdP4.innerHTML='<label style="color: white; padding-left: 5%;">Descrição: '+descricao+'</label>';
            tdP5.innerHTML='<a href ="'+link_projeto+'"style = "padding-left: 5%;" target="_blank" rel="noopener noreferrer">Link do GitHub</a>';
            
            fieldsetP.appendChild(tdP1);
            fieldsetP.appendChild(tdP2);
            fieldsetP.appendChild(tdP3);
            fieldsetP.appendChild(tdP4);
            fieldsetP.appendChild(tdP4);
            fieldsetP.appendChild(tdP5);
            tbodyProj.appendChild(fieldsetP);}



