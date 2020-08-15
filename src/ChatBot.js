import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';

const Chatbot = () => {

  return (    
      <ChatBot
        headerTitle="煤氣虛擬助理 Tinny"
        recognitionEnable={true}
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
              { value: 1, label: '賬單及報錶', trigger: '賬單及報錶' },
              { value: 2, label: '安裝工程', trigger: 'initialMessage2' },
              { value: 3, label: '產品資料', trigger: 'initialMessage2' },
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
            id: '賬單及報錶',
            options: [
              { value: 1, label: '賬單發單頻率', trigger: '賬單發單頻率' },
              { value: 2, label: '賬單計算方法', trigger: '賬單計算方法' },
              { value: 3, label: '賬單繳費方法', trigger: '賬單繳費方法' },
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
            id: '賬單繳費方法',
            message: `客戶可以通過下列途徑繳交煤氣費：
            1. 銀行自動轉賬
            2. 信用卡自動轉賬
            3. 網上繳費
            4. 電話繳費 (繳費靈)
            5. 銀行自動櫃員機
            6. 銀行存支票機
            7. 東亞銀行櫃位
            8. 煤氣客戶中心
            9. 郵政局
            10. 郵寄支票
            11. 便利店/超市
            12. 電子支票
            13. TNG 電子錢包
            14. 轉數快`,            
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

    if (input.value.includes('ff')) {
      return this.props.triggerNextStep({ trigger: '賬單及報錶'})
    } else {
      return this.props.triggerNextStep({ trigger: 'initialOptions'})
    }
    
  }

  
  
  // triggerNext() {
  //   this.setState({ trigger: true })
  //   this.props.triggerNextStep({ trigger: '賬單及報錶'})
  // }

  // triggerNext() {
  //   this.setState({ trigger: true }, () => {
  //     this.props.triggerNextStep({ trigger: '賬單及報錶' })
  //     // const input = this.state
  //     // console.log(input)
  //     // if (input) {
  //     //   return this.props.triggerNextStep({ trigger: '賬單及報錶' })
  //     // } else {
  //     //   return this.props.triggerNextStep({ trigger: '賬單及報錶' })
  //     // }      
  //   })
  // } 

  render() { 
    return null
  }
}

InputParser.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
}


export {Chatbot as default};