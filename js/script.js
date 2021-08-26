const Main = {
    // Reponsavel por iniciar tudo
    init: function() {
        this.cacheSelectos()
        this.bindEvents()
    },
    // Reponsavel por selecionar os elementos no html e guardar em uma variavel
    cacheSelectos: function(){
        // A variavel é colocada com THIS porque irá se utilizada fora do scopo de cacheSelectors, e para isso o é utilizado para ser reconhecido em outras partes da aplicação
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')

    },
    // Reponsavel por adicionar eventos ex: clicks, press enter
    bindEvents: function(){
        //Por causa dos check serem corridos no loops, o this acaba ficando global e pare ele ser localizado precisa-se colocar ele dentro da variavel e usar no loop
        const self = this
        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.$inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        })
    },

    //Local onde onde os eventos são criados
    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if (isDone){
                li.classList.remove('done')
            } else {
                li.classList.add('done')
            }
        },


        $inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value


            if(key === 'Enter'){
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''


                // A funções foram chamadas porque mexendo na arvore de html e com isso todas sao perdidas
                this.cacheSelectos()
                this.bindEvents()
            }

        },

        removeButton_click: function(e){
            let li = e.target.parentElement

            li.classList.add('removed')
            
            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }
}

Main.init()