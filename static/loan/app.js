(function (ns, w, d, $) {

"use strict";

var win = $(w);
var doc = $(d);

doc.ready(function () {

  $('#purchase_date').get(0).valueAsDate = new Date();

  $('.btn-primary').on('click', function (e) {
    e.preventDefault();
    var purchase_date = $('#purchase_date').get(0).valueAsDate;
    var price = $('#price').val() * 10000;
    var deposit = $('#deposit').val() * 10000;
    var interest_rate = Number($('#interest_rate').val()) / 100;
    var loan_years = $('#loan_years').val();
    var rent = Number($('#rent').val()) * 10000;
    var management_fee = Number($('#management_fee').val());
    var administrative_expense = Number($('#administrative_expense').val());
    var reserve_fund_for_repair = Number($('#reserve_fund_for_repair').val());
    var real_estate_acquisition_tax = Number($('#real_estate_acquisition_tax').val());
    var fixed_asset_tax = Number($('#fixed_asset_tax').val());
    var prepayments = Number($('#prepayments').val());
    var rent_change = Number($('#rent_change').val());
    var drop_rate_for_new = Number($('#drop_rate_for_new').val());
    var drop_rate_for_old = Number($('#drop_rate_for_old').val());
    var tbody = $('tbody');
    tbody.empty();

    var remaining_debt = price - deposit; // 残債
    var year = purchase_date.getFullYear();
    var years = loan_years;

    var loan_count = loan_years * 12;
    var monthly_interest_rate = interest_rate / 12;
    var monthly_repayment = Math.floor((remaining_debt * monthly_interest_rate * Math.pow(monthly_interest_rate + 1, loan_count)) / (Math.pow(monthly_interest_rate + 1, loan_count) - 1));

    var total_interest = 0;
    var total_prepayments_fee = 0;
    var total_balance = deposit * -1;
    var sale_price = price;

    for (var i = 0; i <= loan_years; i++) {
      var month_count = i > 0 ? 12 : 12 - purchase_date.getMonth();
      var repayment = monthly_repayment * month_count; // 返済
      if (repayment > remaining_debt) {
        repayment = remaining_debt;
      }
      var interest = 0; // 利息
      var principal = 0; // 元本
      for (var l = 0; l < month_count; l++) {
        if (remaining_debt > 0) {
          var monthly_interest = parseInt(remaining_debt * monthly_interest_rate);
          var monthly_principal = monthly_repayment - monthly_interest;
          interest += monthly_interest;
          principal += monthly_principal;
          remaining_debt -= monthly_principal;
        }
      }
      var tax = 0;
      if (i == 1)  {
        tax = real_estate_acquisition_tax + fixed_asset_tax;
      } else if (i > 1) {
        tax = fixed_asset_tax;
      }
      var prepayments_of_the_year = 0;
      var prepayments_fee = 0;
      if (i > 0 && remaining_debt > 0 && prepayments > 0 && i) {

        if (prepayments >= remaining_debt) {
          prepayments_of_the_year = remaining_debt;
        } else {
          prepayments_of_the_year = prepayments;
          // 一部繰上返済後は新元本が10万年単位になる必要がある
          prepayments_of_the_year += remaining_debt % 100000;
        }

        remaining_debt -= prepayments_of_the_year;

        if (remaining_debt > 0) {
          // 一部繰上返済手数料
          prepayments_fee = Math.floor(20000 * 1.08) + Math.floor(5000 * 1.08) + 200;
        } else {
          // 全額繰上返済手数料
          if (i <= 3) {
            prepayments_fee = Math.floor(prepayments_of_the_year * 0.01) + Math.floor(5000 * 1.08);
          } else if (i <= 7) {
            prepayments_fee = Math.floor(prepayments_of_the_year * 0.005) + Math.floor(5000 * 1.08);
          } else {
            prepayments_fee = Math.floor(20000 * 1.08) + Math.floor(5000 * 1.08);
          }
        }
      }
      if (remaining_debt < 0) {
        remaining_debt = 0;
      }
      if (i > 0 && rent_change != 0) {
        rent = rent + rent_change;
      }
      if (drop_rate_for_new != 0) {
        var rate = i == 0 ? drop_rate_for_new : drop_rate_for_old;
        sale_price = Math.floor(sale_price - (sale_price * (rate / 100)));
      }
      var balance = rent * month_count - (management_fee + administrative_expense + reserve_fund_for_repair) - repayment - tax;
      total_interest += interest;
      total_prepayments_fee += prepayments_fee;
      total_balance += balance;
      if (prepayments_of_the_year > 0) {
        total_balance -= prepayments;
      }
      var tr = $('<tr/>');
      tr.append($('<th scope="row" class="text-xs-center"/>').text(year));
      tr.append($('<td class="text-xs-right"/>').text(remaining_debt));
      tr.append($('<td class="text-xs-right"/>').text(repayment));
      tr.append($('<td class="text-xs-right"/>').text(interest));
      tr.append($('<td class="text-xs-right"/>').text(principal));
      tr.append($('<td class="text-xs-right"/>').text(management_fee + administrative_expense + reserve_fund_for_repair));
      tr.append($('<td class="text-xs-right"/>').text(tax));
      tr.append($('<td class="text-xs-right"/>').text(management_fee + administrative_expense + reserve_fund_for_repair + tax));
      tr.append($('<td class="text-xs-right"/>').text(rent * month_count));
      tr.append($('<td class="text-xs-right"/>').text(balance));
      tr.append($('<td class="text-xs-right"/>').text(prepayments_of_the_year));
      tr.append($('<td class="text-xs-right"/>').text(prepayments_fee));
      tr.append($('<td class="text-xs-right"/>').text(total_balance));
      tr.append($('<td class="text-xs-right"/>').text(sale_price));
      tr.append($('<td class="text-xs-right"/>').text(total_balance + sale_price - remaining_debt));
      tbody.append(tr);
      year++;
    }

    var tr = $('<tr/>');
    tr.append($('<th scope="row" class="text-xs-center"/>').text('total'));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(total_interest));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(total_prepayments_fee));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tr.append($('<td class="text-xs-right"/>').text(''));
    tbody.append(tr);

    tbody.find("td").each(function(){
      $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
    });
  });


});

})(this, window, document, jQuery);
