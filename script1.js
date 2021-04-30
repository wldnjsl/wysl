'use strict';

class Calculator {
    constructor(displayElement){
        this.displayElement = displayElement
        this.operatorCheck = true
        this.equalsCheck = false //버튼 클릭 여부 관리
        this.clear()
    }

    appendNumber(number) {
        if (this.equalsCheck) {
            this.displayContent = number //새로운식입력
            this.equalsCheck = false
        } else {
            this.displayContent += number // 기존 식에 추가
        }
        this.operatorCheck = false
    }

    appendOperator(operator) {
        if (this.operatorCheck) return false
        if (this.equalsCheck) this.equalsCheck = false
        this.displayContent += operator
        this.operatorCheck = true
    }

    updateDisplay() {
        this.displayElement.value = this.displayContent
    }
    compute() {
        if (this.operatorCheck) return
        this.displayContent = eval(this.displayContent
            .replace('\u00D7', '*')    
            .replace('\u00F7', '/')    
        )
    }

    clear(){
        this.displayContent = ''
        this.displayElement.value = 0
        this.operatorCheck = true
    }
}

const buttons = document.querySelectorAll('button')
const displayElement = document.querySelector('input')

const calculator = new Calculator(displayElement)

//forEach를 사용하여 모든 버튼을 불러온다
buttons.forEach(button => {
    button.addEventListener('click', ()=> {
        switch(button.dataset.type) {
            case 'operator':
                calculator.appendOperator(button.innerText)
                calculator.updateDisplay()
                break
            case 'ac':
                calculator.clear()
                break
            case 'equals':
                calculator.compute()
                calculator.updateDisplay()
                break
            default:
                calculator.appendNumber(button.innerText)
                calculator.updateDisplay()
                break
        }
    })
})

