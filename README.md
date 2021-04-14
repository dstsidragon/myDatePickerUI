# 自製myDatePicker套件

## 引用JQuery
   Jquery
<script src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>

## 引用JmyDatePicker套件JS及CSS　 CDN
--JS

<script src="https://github.com/dstsidragon/myDatePickerUI/blob/main/js/datePicker.js"></script>



--css

< link rel="stylesheet" href="https://github.com/dstsidragon/myDatePickerUI/blob/main/css/datePicker.css " >
 

## 套件html
--html
 <!--     DatePicker   Start   -->
    <!-- span的ID可自定義 -->
    <span id="datePickerParent">
        <label for="datePicker">日期:</label>
        <!-- input的ID可自定義 -->
        <input id="datePicker" type="text" >
    </span>
    <!--     DatePicker   End   -->

##  呼叫套件
--js  
 //  呼叫DatePicker  ID為INPUT的ID 
     $("#datePicker").myDatePicker();

## 說明
-可重複引用(同時使用很多不同ID)
-點擊 (日期:) 或是 輸入框，會彈跳出日曆
-今日的日期會  反黃
-選擇的日期會  反藍
-點擊日曆 年及月的按鈕，會切換年及月
-點擊日期會將你選擇的日期以 dd/mm/yyyy 格式顯示
