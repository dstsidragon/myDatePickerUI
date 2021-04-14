
  $.fn.extend({

    myDatePicker: function calDatePicker() {
      //fn 
      const fnVal = $(this.selector);

      //fn 的子元素
      const fnParent = $(`#${fnVal.parent().attr("id")}`);
      //fn 的子元素的ID
      const sID = this.selector.split("#")[1];

      fnVal.attr("data", `datePicker_${sID}`);
      fnParent.attr("data", `datePicker_${sID}`);

      let dSetCal = new datePicker();  //宣告dSetCal 等於new datePicker(),需要有new才能操作裡面的物件，沒有new會承接之前的datePicker 參數 
      //彈跳視窗
      fnVal.focus(showTable);

      fnVal.keypress(enterHiddenTable);

      //開啟表格
      function showTable(e) {

        $(`#calTab_${sID}`).show();  //顯示/隱藏表格
        let sDateTable = $(this).val();
        dSetCal.init(sDateTable);
        // //點擊就觸發事件
        $(document).click(checkData);
      }
      // 判斷點到的物件 data值是不是datePicker
      function checkData(e) {
        // console.log($(e.target).prop("tagName"));
        // console.log($(e.target).attr("data"));
        if ($(e.target).attr("data") !== `datePicker_${sID}` && $(e.target).attr("for") !== sID) {
          $(`#calTab_${sID}`).hide();  //顯示/隱藏表格
        }
      }
      //關閉表格
      function enterHiddenTable(e) {
        if (e.which == 13) {
          $(`#calTab_${sID}`).hide();  //顯示/隱藏表格
          let sDateTable = $(this).val();
          dSetCal.init(sDateTable);
        }
      }



      //datePicker 本體
      function datePicker() {

        let dDate = new Date();

        this.iDatePickerMon = dDate.getMonth() + 1;    //紀錄月份 getMonth() 是0~11  所以要+1才能變成實際月
        this.iDatePickerYear = dDate.getFullYear();     //紀錄年份 格式:2021
        const dToday = dDate;                            //設定dToday 等於今天日期
        const iTodayYear = dDate.getFullYear();          //設定dToday 等於今天年份
        const iTodayMonth = dDate.getMonth() + 1;          //設定dToday 等於今天月份
        const iTodayDate = dDate.getDate();              //設定dToday 等於今天日
        let iChoTodayYear = "";                        //選擇的今天日期
        let iChoTodayMonth = "";                       //選擇的今天年份
        let iChoTodayDate = "";                        //選擇的今天日


        const dateArray = ["日", "一", "二", "三", "四", "五", "六"]



        let sDateTable = "";

        sDateTable = `<table data="datePicker_${sID}" id="calTab_${sID}" class="calTab text-center" cellpadding="4" cellspacing="1">`;
        sDateTable += `<thead  data="datePicker_${sID}"></thead>`;
        sDateTable += `<tbody data="datePicker_${sID}" ></tbody>`;
        sDateTable += `</table>`;
        fnParent.after(sDateTable);


        const tbody = $(`#calTab_${sID} tbody`);   // 宣告tbody等於ID calTab 裡的tbody
        const thead = $(`#calTab_${sID} thead`);   // 宣告tbody等於ID calTab 裡的thead



        function prtHead() {
          //顯示年分、月份
          sDateTable = `<tr data="datePicker_${sID}">`;
          sDateTable += `<td  colspan = '1' id="prev_year_${sID}" data="datePicker_${sID}"> << </td>`;   //用 << 當作換上個年份 ,增加可控制的class
          sDateTable += `<td colspan = '5' id= "now_year_${sID}" data="datePicker_${sID}" class="text-center"> ${this.iDatePickerYear}年</td>`;//顯示格式 EX  2021/03
          sDateTable += `<td  colspan = '1'  id="next_year_${sID}" data="datePicker_${sID}"> >> </td>`;   //用 >> 當作換下個年份,增加可控制的class
          sDateTable += `</tr>`;
          sDateTable += `<tr data="datePicker_${sID}">`;
          sDateTable += `<td  colspan = '1'  id="prev_mon_${sID}" data="datePicker_${sID}"> << </td>`;   //用 <  當作換上個月份 ,增加可控制的class
          sDateTable += `<td colspan = '5' id= "now_mon_${sID}" data="datePicker_${sID}" class="text-center"> ${this.iDatePickerMon}月</td>`;//顯示格式 EX  2021/03
          sDateTable += `<td  colspan = '1'  id="next_mon_${sID}" data="datePicker_${sID}"> >>  </td>`;   //用 >  當作換下個月份,增加可控制的class
          sDateTable += `</tr>`;

          // 星期抬頭
          sDateTable += `<tr data="datePicker_${sID}">`;
          dateArray.forEach(function (item, i) {
            sDateTable += `<th data="datePicker_${sID}">${dateArray[i]}</th>`;
          })
          sDateTable += "</tr>";


          thead.html(sDateTable);                           //把切換月份的內容放在table 的 thead 裡面

          //切換月份  放在星期抬頭後 才能抓取到裡面的值
          $(`#prev_mon_${sID}`).click(prevMon);
          $(`#next_mon_${sID}`).click(nextMon);

          // 換上個月
          function prevMon() {
            iDatePickerMon -= 1;                    //換上月 月份要-1
            chgMon(iDatePickerMon);
          }

          // 換下個月
          function nextMon() {
            iDatePickerMon += 1;                    //換下月 月份要+1
            chgMon(iDatePickerMon);
          }

          //判斷年份是否要切換及將月份正確顯示
          function chgMon(item) {
            if (item == 0) {                  //如果月份的值顯示為 0 ，0為前年12月
              iDatePickerYear -= 1;                     //年份-1
              dDate.setFullYear(iDatePickerYear);             //年份重新設定為-1的年份
              iDatePickerMon = 12;                        //把月份值從0 變成12
              dDate.setMonth(iDatePickerMon);                  //把月份值重新帶入

            } else if (item == 13) {                  //如果月份的值顯示為13 ，13為隔年1月
              iDatePickerYear += 1;                     //年份+1
              dDate.setFullYear(iDatePickerYear);             //年份重新設定為+1的年份
              iDatePickerMon = 1;                        //把月份值從13 變成1
              dDate.setMonth(iDatePickerMon - 1);                  //把月份值重新帶入
            } else {
              dDate.setMonth(iDatePickerMon - 1);                //月份-1
            }

            $(`#now_year_${sID}`).html(`${iDatePickerYear}年`);   //重新刷新年份
            $(`#now_mon_${sID}`).html(`${iDatePickerMon}月`);   //重新刷新月份

            prtTbody();                                   //刷新日期
          }

          //切換年份
          $(`#prev_year_${sID}`).click(prevYear);
          $(`#next_year_${sID}`).click(nextYear);

          //換上一年
          function prevYear() {
            iDatePickerYear -= 1;                    //換上年 年份要-1
            dDate.setFullYear(iDatePickerYear);
            dDate.setMonth(iDatePickerMon - 1);     //沒加上這行 切換年份時月份會自動加1
            $(`#now_year_${sID}`).html(`${iDatePickerYear}年`);   //重新刷新年份
            $(`#now_mon_${sID}`).html(`${iDatePickerMon}月`);   //重新刷新月份
            prtTbody();                                   //刷新日期
          }

          //換上一年
          function nextYear() {
            iDatePickerYear += 1;                    //換下年 年份要+1
            dDate.setFullYear(iDatePickerYear);
            dDate.setMonth(iDatePickerMon - 1);     //沒加上這行 切換年份時月份會自動加1
            $(`#now_year_${sID}`).html(`${iDatePickerYear}年`);   //重新刷新年份
            $(`#now_mon_${sID}`).html(`${iDatePickerMon}月`);   //重新刷新月份
            prtTbody();                                   //刷新日期
          }

        };


        //設一個函式等於 原本產生下面的日期的程式碼
        function prtTbody() {
          //清空日曆盤資料
          tbody.html("");

          //取得本月1號
          let dSetDate = dDate;   //設定dSetDate為今天日期
          dSetDate.setDate(1);         //將dSetDate設為當月1號

          //建立第一周
          let weekDay_1 = dSetDate.getDay();  //將weekDay_1設為dSetDate的星期

          sDateTable = `<tr data="datePicker_${sID}">`;                           //因為是第一周所以要做前面的空格處理
          for (let i = 0; i < weekDay_1; i++) {            //當月一號的星期前面要補幾個空格
            sDateTable += `<td  data="datePicker_${sID}"></td>`;
          }

          //要再做一個迴圈去取得所有時間
          monDate = dSetDate;   //從每個月1號開始
          for (let i = weekDay_1; i < 7; i++)     //設定i等於今天的星期
          {                  //下 class="can_sel_day" 是只有點擊這個class才會把值傳入input
            sDateTable += `<td id="${padLeft(monDate.getFullYear(), 2)}${padLeft(monDate.getMonth() + 1, 2)}${padLeft(monDate.getDate(), 2)}${sID}" class="can_sel_day" data="datePicker_${sID}">${monDate.getDate()}</td>`;    //將取得的當月1號拼成字串賦在 sDateTable     
            monDate.setDate(monDate.getDate() + 1);        //日期設成當月1號 + 1 = 等於2號 循環下去

          }

          sDateTable += "</tr>";




          //建立第二週到第四周
          let nowMon = monDate.getMonth();   //記錄這個月是幾月
          for (; nowMon == monDate.getMonth();) {   //不需要起始值，所以起始值空白，nowMon等這個月就跑迴圈 
            //這迴圈用來換行，一周七天，所以七天要換行一次
            sDateTable += `<tr data="datePicker_${sID}">`
            //這迴圈再新增一個條件去刪掉下個月的日期，

            //nowMon是3月，monDate.getMonth跟著迴圈在增加，monDate.getMonth如果累加到4月 迴圈就停止
            for (let i = 0; i < 7 && nowMon == monDate.getMonth(); i++) {
              //下 class="can_sel_day" 是只有點擊這個class才會把值傳入input
              sDateTable += `<td id="${padLeft(monDate.getFullYear(), 2)}${padLeft(monDate.getMonth() + 1, 2)}${padLeft(monDate.getDate(), 2)}${sID}" class="can_sel_day" data="datePicker_${sID}">${monDate.getDate()}</td>`;    //將取得的當月1號拼成字串賦在 sDateTable  
              monDate.setDate(monDate.getDate() + 1);        //日期設成當月1號加上前一個迴圈加總的日期  再+1 循環下去

            }
            sDateTable += `</tr>`;


          }


          tbody.append(sDateTable);
          //判斷今日日期反黃
          $('.can_sel_day').each(chgTodayColor);

          //判斷日期改變顏色
          function chgTodayColor(i, n) {
            const iId = $(n).attr("id");  //取出ID
            const IDAry = iId.split(''); //把ID 變成陣列
            let iYear = IDAry[0] + IDAry[1] + IDAry[2] + IDAry[3];   //拼湊出年份
            let iMon = IDAry[4] + IDAry[5];                      //拼湊出月份
            let iDate = IDAry[6] + IDAry[7];                     //拼湊出日

            $(`#${iYear}${iMon}${iDate}${sID}`).attr("class", "can_sel_day ");   //把所有ID的CLASS都先賦予can_sel_day
            // console.log(iYear);
            // console.log(iMon);
            // console.log(iDate);
            if (iYear == iTodayYear && iMon == iTodayMonth && iDate == iTodayDate) {  //如果ID的年月日 跟今日的年月日相同
              $(`#${iYear}${iMon}${iDate}${sID}`).attr("class", "can_sel_day yellow");//把ID的CLASS賦予can_sel_day yellow
            } else if (iYear == iChoTodayYear && iMon == iChoTodayMonth && iDate == iChoTodayDate) {
              $(`#${iYear}${iMon}${iDate}${sID}`).attr("class", "can_sel_day blue");//把ID的CLASS賦予can_sel_day yellow
            }

          }



          //建立點擊日曆存值事件,點擊到ID為#calTab_${sID} 裡面的td標籤為.can_sel_day時觸發
          $(`#calTab_${sID} .can_sel_day`).click(inpSelectDate);

          //將選取的日期值呈現在INPUT
          function inpSelectDate() {
            let selectDay = $(this).html();     //宣告 selectDay 等於點擊到的日
            // console.log(iDatePickerYear);
            let selectDate = new Date(iDatePickerYear + "-" + iDatePickerMon + "-" + selectDay);  //宣告 selectDate 等於 點擊的年-月-日組合
            let sSelectDate = padLeft((selectDate.getMonth() + 1), 2) + "/" + padLeft(selectDate.getDate(), 2) + "/" + selectDate.getFullYear(); //把拼湊好的日期格式賦予在sSelectDate內 EX 2021/1/26 ，getMonth() 是0~11  所以要+1才能變成實際月
            //  console.log(sSelectDate)
            fnVal.val(sSelectDate);
            $(`#calTab_${sID}`).toggle();  //顯示/隱藏表格
            // alert(sSelectDate);
          }




        }







        //補日期字數
        function padLeft(item, i) {                     //字數不足 就補 0  補到我們要的位數，0的數量取決於你的參數i
          if ((item + "").length >= i) {               //加上 "" 就會把item變成字串 才能算出他的長度
            return item;
          } else {
            return padLeft("0" + item, i);
          }
        };


        //刷新日曆盤為你輸入的日期
        this.init = inpDateChangedCal;

        function inpDateChangedCal(item) {
          let tmp_sel_date = item; //宣告tmp_sel_date 等於 輸入的日期
          let selectDate = new Date(tmp_sel_date);  //宣告selectDate
          if (item !== "" && selectDate.getFullYear() < 10000 && selectDate.getFullYear() > 999) {

            iDatePickerMon = selectDate.getMonth() + 1;  //取得輸入的月份
            iDatePickerYear = selectDate.getFullYear();  //取得輸入的年份
            dDate = selectDate;
            iChoTodayYear = iDatePickerYear;
            iChoTodayMonth = iDatePickerMon;
            iChoTodayDate = selectDate.getDate();


          } else {
            dDate = new Date();
            iDatePickerMon = dDate.getMonth() + 1;  //取得輸入的月份
            iDatePickerYear = dDate.getFullYear();  //取得輸入的年份
          };
          prtTbody();   //刷新TBODY
          prtHead();  //刷新THEAD
        };

        fnVal.keyup(inpDateChangedCal2);

        function inpDateChangedCal2() {
          let dChoToday = fnVal.val();
          let tmp_sel_date = fnVal.val(); //宣告tmp_sel_date 等於 輸入的日期
          let selectDate = new Date(tmp_sel_date);  //宣告selectDate

          if (dChoToday !== " " && (selectDate.getFullYear()) > 0 && (selectDate.getFullYear()) < 10000
            && (selectDate.getMonth() + 1) < 13 && (selectDate.getMonth() + 1) > 0
            && (selectDate.getDate()) > 0) {
            // console.log(dChoToday);
            iDatePickerMon = selectDate.getMonth() + 1;  //取得輸入的月份
            // console.log(iDatePickerMon);
            iDatePickerYear = selectDate.getFullYear();  //取得輸入的年份
            dDate = selectDate;
            iChoTodayYear = iDatePickerYear;
            iChoTodayMonth = iDatePickerMon;
            iChoTodayDate = selectDate.getDate();




          } else {
            dDate = new Date();
            iDatePickerMon = dDate.getMonth() + 1;  //取得輸入的月份
            iDatePickerYear = dDate.getFullYear();  //取得輸入的年份
          };
          prtTbody();   //刷新TBODY
          prtHead();  //刷新THEAD
        };

      }


    },
  });
