
window.addEventListener('DOMContentLoaded',()=>{
    function isJsonString(str) {
        try {
            const p = JSON.parse(str)
            
            return p;
        } catch (e) {
            const jso = {
                "minu" : 300000, 
                "text": "а текст кто будет писать ?",
                "urlinputLoc" : "Нет ссылки! я без ссылки как кот без миски!",
            } 
            return jso;
        }
    }
    function isValidIdo(info) {
        if(typeof info === 'number'){
            if(info <= 1000) return 300000
            if(info < 0) return 300000
            return info
        } else if(typeof info === 'string'){
            if(info === '') return "Нету текста! я без текста как кот без миски!";
            if(info.trim() === '') return "Нету текста! я без текста как кот без миски1111!"
            return info
        } else {
            return 'что-то не понятное!'
        }
    }
    console.log( isValidIdo('102012') )
    
    const btn = document.querySelector('#buttonTimer'),
          textStatus = document.getElementById("timer")
          fullObj = document.querySelector('#fullObj');
    
    let interval;
          
    const start = (minuf,textf,urlinputLocf) => {
        
        textStatus.innerHTML = "бегает!";
        textStatus.style.background = 'burlywood'
        
        const minu = isValidIdo(minuf),
              text = isValidIdo(textf),
              urlinputLoc = isValidIdo(urlinputLocf);
        console.log(minuf)
        const now = new Date(),
              minutes = Math.floor((minu / (1000 * 60)) % 60);
        
        // console.log(typeof objStri);

            interval =  setInterval(function () {
                clearInterval(interval);
                
              
                const url = `https://api.telegram.org/bot6447470353:AAEgx88L_vRqPhi6y_edY0Te1S7aSL6k9yQ/sendMessage?chat_id=6377248808&text=Упал Тест: ${text} %0A %0Aдата и время: ${now} %0A %0AУрл на тест: ${urlinputLoc} %0AВремя ожидания прогона: ${minu} млс ${minutes !== 0?'≈ ' + minutes + ' мин':''}`
                fetch(url);

                textStatus.innerHTML = "провален!";
                textStatus.style.background = '#d36a6a';
                
                fullObj.removeAttribute('disabled');

                btn.classList.remove('active');
                btn.innerHTML = 'Старт';
            },minu)

        }

    const stop = () => {
            clearInterval(interval);
            textStatus.innerHTML = "успешно!";
            textStatus.style.background = '#2aa568'
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
           
            const fullObjLocal = document.querySelector('#fullObj');
            const objStri = isJsonString(fullObjLocal.value);
            
            if(!btn.classList.contains('active')){

                btn.innerHTML = 'Стоп'
                btn.classList.add('active');

                const {minu,text,urlinputLoc} = objStri;

                start(
                    minu,
                    text,
                    urlinputLoc
                    );
                
                    fullObjLocal.setAttribute('disabled',true);
                    fullObjLocal.value = '';
          
            } else {
                fullObjLocal.value = '';
                fullObjLocal.removeAttribute('disabled');

                btn.innerHTML = 'Старт'
                btn.classList.remove('active');
                stop();
            }
        
            })
})
