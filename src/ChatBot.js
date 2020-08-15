import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const Chatbot = () => {

  return (    
      <ChatBot
        headerTitle="煤氣虛擬助理 Tinny"
        placeholder="請以關鍵詞輸入您的查詢(15字內)"
        recognitionEnable={true}
        enableSmoothScroll={true}
        steps={[
          {
            id: 'initialMessage',
            delay: false,
            message: `午安，我叫Tinny。我可以回答「家居客戶」的一般查詢。 😊

            喺查詢之前，請閱讀以下溫馨提示！😊
            1. 呢度未能解答閣下戶口嘅查詢及辦理服務(如開戶、約維修等)。如有需要，請按此填寫網上表格，我哋會盡快回覆！
            2. 請以關鍵詞輸入查詢(15字內)，如：怎樣申請電子賬單?
            3. 我係一個新手，有時候未能回答你嘅查詢，但我會不斷改善！另外，你可以選擇下面嘅「主目錄」直接尋找答案！`,
            trigger: 'initialMessage2',
          },
          {
            id: 'initialMessage2',
            delay: false,
            message: '我可以為你解答有關以下既問題:(請選擇以下按鈕)',            
            trigger: 'initialOptions'            
          },
          {
            id: 'initialOptions',
            options: [
              { value: 1, label: '賬單', trigger: '賬單' },
              { value: 2, label: '安裝工程', trigger: '安裝工程' },
              { value: 3, label: '產品保養', trigger: '產品保養' },
              { value: 4, label: '手動輸入關鍵詞查詢', trigger: 'input' },
            ],
          },
          {
            id: 'input',
            user: true,
            trigger: 'inputParser'
          },
          {
            id: 'inputParser',
            component: <InputParser />,
            replace: true,
            waitAction: true, // to disable default trigger action
            asMessage: true,
            trigger: 'initialMessage2',
          },
          {
            id: '賬單',
            options: [
              { value: 1, label: '賬單發單頻率', trigger: '賬單發單頻率' },
              { value: 2, label: '賬單計算方法', trigger: '賬單計算方法' },
            ]
          },
          {
            id: '賬單發單頻率',
            message: '客戶會每兩個月收到賬單，賬單上詳列出每月的煤氣費和繳費資料。',            
            end: true
          },
          {
            id: '賬單計算方法',
            message: `煤氣費 =「煤氣標準收費」+「燃料調整費」+「保養月費$9.5」

            煤氣費的計算方法，請參閱煤氣公司網站
            
            註﹕
            1. 「煤氣費」是依照公司當時發表有效的收費表及燃料調整費而計算。
            2. 如「煤氣費」(未包「保養月費$9.5」前)少於每月基本收費$20,則該月須繳付基本收費$20。`,            
            end: true
          },     
          {
            id: '安裝工程',
            options: [
              { value: 1, label: '估價服務', trigger: '估價服務' },
              { value: 2, label: '安裝工程專業資格', trigger: '安裝工程專業資格' },
            ]
          },
          {
            id: '估價服務',
            message: `煤氣公司可提供以下免費估價服務，以確保安裝工程的可行性。
            1. 安裝於煤氣公司購買的爐具
            2. 更改灶台或訂製不銹鋼框架
            3. 更換煤氣喉管`,            
            end: true
          },
          {
            id: '安裝工程專業資格',
            message: `所有氣體裝置工程包括建造、接駁、截離、試驗、投入運作、解除運作、維修、修理或更換氣體配件，只可由受僱於註冊氣體工程承辦商的註冊氣體裝置技工進行，從而保障氣體用戶和市民的安全。
            註冊氣體裝置技工牌照須透過機電工程署申請。`,            
            end: true
          },       
          {
            id: '產品保養',
            options: [
              { value: 1, label: '煤氣爐具', trigger: '煤氣爐具' },
              { value: 2, label: '石油氣爐具', trigger: '石油氣爐具' },
            ]
          },
          {
            id: '煤氣爐具',
            message: `住宅用戶新購買煤氣爐具，在安裝後可享有三年的保養期
            註：保養服務並不包括損耗配件 (如爐架、溢湯盤、爐蓋及爐環等)。`,            
            end: true
          },
          {
            id: '石油氣爐具',
            message: `住宅用戶新購買石油氣爐具，在安裝後可享有三年的保養期
            *如維修保養地區在馬灣、大嶼山(東涌除外)及離島需按次另加$800元的附加費。 所有行使禁區紙的地區則不獲提供維修保養服務 註：保養服務並不包括損耗配件 (如爐架、溢湯盤、爐蓋及爐環等)。`,            
            end: true
          }, 
          {
            id: 'sorry',
            message: `抱歉，我不懂你的意思。請致電91234567聯絡客服。`,
            end: true
          }
        ]}
      />    
  );
}

class InputParser extends Component {
  constructor(props) {
    super(props)

    this.state ={
      input: ''
    }   
    
    // this.triggerNext = this.triggerNext.bind(this)
  }

  componentWillMount() {
    const { steps } = this.props
    const { input } = steps
    this.setState({ input })
    const word = input.value
    
    if (word.includes('賬單')) {
      return this.props.triggerNextStep({ trigger: '賬單'})
    } 
    else if (word.includes('發單')||word.includes('幾時')){
      return this.props.triggerNextStep({ trigger: '賬單發單頻率'})
    } 
    else if (word.includes('煤氣費')||word.includes('月費')){
      return this.props.triggerNextStep({ trigger: '賬單計算方法'})
    } 
    else if (word.includes('安裝')||word.includes('工程')){
      return this.props.triggerNextStep({ trigger: '安裝工程'})
    } 
    else if (word.includes('估價')){
      return this.props.triggerNextStep({ trigger: '估價服務'})
    } 
    else if (word.includes('專業')||word.includes('資格')){
      return this.props.triggerNextStep({ trigger: '安裝工程專業資格'})
    } 
    else if (word.includes('保養')||word.includes('爐具')){
      return this.props.triggerNextStep({ trigger: '產品保養'})
    } 
    else if (word.includes('煤氣爐')){
      return this.props.triggerNextStep({ trigger: '煤氣爐具'})
    } 
    else if (word.includes('石油氣')){
      return this.props.triggerNextStep({ trigger: '石油氣爐具'})
    }
    else {
      return this.props.triggerNextStep({ trigger: 'sorry' })
    }    
  }

  render() { 
    return null
  }
}

InputParser.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
}


export {Chatbot as default};