//var TEAM_JSON_URL = "/api/football/team.json", TEAM_JSON, LEAGUE_ID = "PL, PD, SA, BL1, DED";

const FOOTBALL_API_KEY = "dde45198d6d14d5b8bb0775f1eb4d9ed";
const LEAGUE_ID = "PL, PD, SA, BL1, DED";

$(function () {

  if ($("#futball-data").length) {
    const CUR_LEAGUE_ID = "PL";
    tables_init(CUR_LEAGUE_ID);

    $(".league-tab-nav ul li a").off("click").on("click", function (e) {
      e.preventDefault();
      var $this = $(this),
        leagueId = $this.data("val");
      var idx = $(this).index(".league-tab-nav ul li a");
      $(".league-tab-nav ul li").removeClass("on").eq(idx).addClass("on");
      $(".league-subtab-nav ul li").removeClass("on").eq(0).addClass("on");
      console.log(leagueId);
      tables_init(leagueId);
    });

    $(".league-subtab-nav ul li a").off("click").on("click", function (e) {
      e.preventDefault();
      var $this = $(this),
        action = $(this).attr("class");
      var leagueId = $("#futball-data").attr("class");

      var idx = $(this).index(".league-subtab-nav ul li a");
      $(".league-subtab-nav ul li").removeClass("on").eq(idx).addClass("on");

      if (action == "tables") {
        tables_init(leagueId);
      } else {
        console.log($("#current-match-round").data("val"));
        matches_init(leagueId, $("#current-match-round").data("val"));
      }
    });
  }

  // football-data.org standing
  function tables_init(leagueId) {
    ugUtil.showLoading();

    ugData.get("https://www.ugoon.net/api/football/standing.php?league=" + leagueId).done(function (data) {
      console.log(data);
      var lastUpaded = data.competition.lastUpdated.toString(),
        currentMatch = data.season.currentMatchday.toString();

      $("#wrap #futball-data .select").remove();
      $("#last-update").html(lastUpaded.substring(0, 10));
      $("#current-match-round").html(" &middot; " + currentMatch + " 라운드").attr('data-val', currentMatch);
      $("#current-match-round").attr("data-val", currentMatch);

      var standings = data.standings[0].table,
        standing_table_body = "";
      // console.log(standings);
      $.each(standings, function (i, o) {
        // console.log(o.team.id);
        standing_table_body += '<tr>';
        standing_table_body += '<td><span>' + o.position + '</span></td>';
        standing_table_body += '<td><span class="team-logo"><img src="/assets/images/fut/team-' + o.team.id + '.png" alt="' + o.team.name + '"></span><span>' + o.team.name + '</span></td>';
        standing_table_body += '<td><span>' + o.playedGames + '</span></td>';
        standing_table_body += '<td><strong>' + o.points + '</strong></td>';
        standing_table_body += '<td><span>' + o.won + '</span></td>';
        standing_table_body += '<td><span>' + o.draw + '</span></td>';
        standing_table_body += '<td><span>' + o.lost + '</span></td>';
        standing_table_body += '</tr>';
      });
      standings_table_html = '<table><thead><tr><th scope="col">순위</th><th scope="col">팀</th><th scope="col">경기수</th><th scope="col">승점</th><th scope="col">승</th><th scope="col">무</th><th scope="col">패</th></tr></thead>' + standing_table_body + '</tbody></table>';
      $("#standing-table").html(standings_table_html);
      $("#futball-data").removeClass().addClass(leagueId);

      $("#standing-table").show();
      $("#matches-table").hide();

      ugUtil.hideLoading();

      $(".league-subtab-nav ul li a.matches").off("click").on("click", function (e) {
        var idx = $(this).index(".league-subtab-nav ul li a");
        $(".league-subtab-nav ul li").removeClass("on").eq(idx).addClass("on");
        matches_init(leagueId, currentMatch);
      });
    });
  }


  function matches_init(leagueId, matchDayVal) {
    //console.log($("#current-match-round").data("val"));
    //var matchDay = $("#current-match-round").data("val");

    if (ugUtil.isEmpty(matchDayVal)) {
      matchDay = $("#current-match-round").data("val");
    } else {
      matchDay = matchDayVal;
    }
    
    //console.log(ugUtil.isEmpty(matchDayVal));
    //console.log(matchDay);   

    ugData.get("https://www.ugoon.net/api/football/matches.php?league=" + leagueId + "&matchday=" + matchDay).done(function (data) {
     // console.log(">>>>>>>>>>>>>>");
      //console.log(data);
      var MATCH_JSON = data,
        match_day = "",
        prev_match_day = "",
        match_html = "",
        match_li_html = "";
      matchday_next = 'n';

      if (leagueId == "BL1") {
        total_match_day = 34;
      } else {
        total_match_day = 38;
      }

      var selectOptionHTML = "";
      for (var i = 1; i <= total_match_day; i++) {
        match_html = '<div class="match-day-box" id="match-day-box-' + i + '" style="display:none;"><p class="match-day-tit" style="display:none;">' + i + ' 라운드</p>';
        match_html += '<div class="match-day-list" id="match-day-' + i + '"><ul></ul></div></div>';

        selectOptionHTML += '<option value="' + i + '"';
        if (i == matchDay) {
          selectOptionHTML += ' selected'
        }
        selectOptionHTML += '>' + i + ' 라운드</option>';
        $("#matches-table").append(match_html);

        $(".match-day-box").hide();
        $("#match-day-box-" + matchDay).show();
        $("#match-day-box-" + matchDay + " .match-day-list ul").empty();
      }

      $("#wrap #futball-data .select").remove();
      selectOptionHTML = '<div class="select"><select id="match-day-list">' + selectOptionHTML + '</select></div>';
      $(".league-subtab-nav").after(selectOptionHTML);

      var k = 1,
        current_match_day = "";

      $("#match-day-" + match_day).empty();
      $("#match-day-" + match_day + " ul").empty();

      $.each(MATCH_JSON.matches, function (i, o) {
        //console.log(o);
        match_day = o.matchday;
        if (prev_match_day == "") prev_match_day = match_day;

        homeTeamGoal = o.score.fullTime.homeTeam;
        awayTeamGoal = o.score.fullTime.awayTeam;

        if (o.score.fullTime.homeTeam == null) {
          homeTeamGoal = "";
          if (current_match_day == "") current_match_day = match_day;
        }
        if (o.score.fullTime.awayTeam == null) awayTeamGoal = "";

        // var home_team_name = o.homeTeam.name, home_team_id = "";
        // $.each(TEAM_JSON.team, function(i, o){
        //     if(home_team_name.indexOf(o.team_name) > -1){
        //         home_team_id = o.team_id;
        //         return false;
        //     }
        // });

        // var away_team_name = o.awayTeam.name, away_team_id = "";
        // $.each(TEAM_JSON.team, function(i, o){
        //     if(away_team_name.indexOf(o.team_name) > -1){
        //         away_team_id = o.team_id;
        //         return false;
        //     }
        // });

        var dt = new Date(o.utcDate);
        dt.setHours(dt.getHours() + 12);
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = dt.getDate();
        day = day < 10 ? '0' + day : day;
        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var ampm = hours >= 12 ? 'AM' : 'PM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = year + "-" + month + "-" + day + " " + hours + ':' + minutes + ' ' + ampm;
        //dt.setUTCHours(9);
        //console.log(strTime);

        match_li_html = '<li><div class="match-score-info" id="match-' + o.id + '">';
        match_li_html += '  <div class="team-box home">';
        match_li_html += '      <div class="team-info">';
        match_li_html += '          <span class="team-logo"><img src="/assets/images/fut/team-' + o.homeTeam.id + '.png" alt="' + o.homeTeam.name + '"></span>';
        //match_li_html += '          <span class="team-name">' + o.homeTeam.name + ' (H)</span>';
        match_li_html += '          <span class="team-name">' + o.homeTeam.name + ' </span>';
        match_li_html += '          <strong class="score">' + homeTeamGoal + '</strong>';
        match_li_html += '      </div>';
        //match_li_html += '      <div class="score-info">' + homeTeamGoal + '</div>';
        match_li_html += '  </div>';
        match_li_html += '  <div class="team-box away">';
        match_li_html += '      <div class="team-info">';
        match_li_html += '          <span class="team-logo"><img src="/assets/images/fut/team-' + o.awayTeam.id + '.png" alt="' + o.awayTeam.name + '"></span>';
        match_li_html += '          <span class="team-name">' + o.awayTeam.name + '</span>';
        match_li_html += '          <strong class="score">' + awayTeamGoal + '</strong>';
        match_li_html += '      </div>';
        //match_li_html += '      <div class="score-info">' + awayTeamGoal + '</div>';
        match_li_html += '  </div>';
        match_li_html += '</div>';
        //match_li_html += '<div class="match-date"><p>' + o.status + '</p><p>' + strTime + '</p></div></li>';
        match_li_html += '<div class="match-date"><p>' + strTime + '</p></div></li>';
        //console.log(i);

        $("#standing-table").hide();
        $("#matches-table").show();

        $("#match-day-" + match_day + " ul").append(match_li_html);
      });

      $("#match-day-list").off('change').on('change', function () {
        var $this = $(this),
          val = $this.val(),
          leagueId = $("#futball-data").attr("class");
        matches_init(leagueId, val);
      });

    });
  }

  // blog category addclass
  var curr_cat_id = $(".postmeta").data("cat-id");
  if (curr_cat_id != "") {
    //console.log("header ul li a[class='nav_" + curr_cat_id + "']");
    $("header ul li a[class='nav_" + curr_cat_id + "']").parent().addClass("current-menu-item");
  } else {
    $("header ul li a.home").parent().addClass("current-menu-item");
  }

  // football-data.org

  /* if ($("#standing_table").length) {
     $("#standing_table").html('<div class="loading"><img src="/assets/images/common/ajax-loader.gif" alt="로딩"></div>');
     var cite_txt = '<p>데이터 출처 : <a href="https://www.football-data.org">www.football-data.org</a></p>';
     $("#standing_table").after(cite_txt);
     

     $.when(
       $.ajax(TEAM_JSON_URL)
     ).done(function(d){
       TEAM_JSON = d;
       console.log(TEAM_JSON);
       standing_init("PL");      
     });
   }

   function standing_init(leagueId) {
     $.ajax({
       url: "/api/football/standing.php",
       data: {league : leagueId},
       dataType: "json"
     }).done(function(data){
       console.log(data);

       var season_info = data.competition.code + " " + data.season.startDate.substring(0, 4) + "-" + data.season.endDate.substring(0, 4) + " SEASON";
       console.log(season_info);

       var standings = data.standings[0].table,
           standings_table_html = '<p class="season_info">' + season_info + '</p>';
           standings_table_html = '<table><tr><thead><th scope="col">순위</th><th scope="col">팀</th><th scope="col">경기수</th><th scope="col">승점</th><th scope="col">승</th><th scope="col">무</th><th scope="col">패</th></thead></tr><tbody>',
           standing_table_body = "";
       
       $.each(standings, function (i, o) {
         team_name = o.team.name;
         team_id = "";
         $.each(TEAM_JSON.team, function(i, o){
             if(team_name.indexOf(o.team_name) > -1){
                 team_id = o.team_id;
                 return false;
             }
         });
           
         standing_table_body += '<tr>';
         standing_table_body += '<td><span>' + o.position + '</span></td>';
         standing_table_body += '<td><span class="team_logo"><img src="/assets/images/fc/' + team_id + '.png" alt='+ o.team.name +'></span><span>' + o.team.name + '</span></td>';
         standing_table_body += '<td><span>' + o.playedGames + '</span></td>';
         standing_table_body += '<td><strong>' + o.points + '</strong></td>';
         standing_table_body += '<td><span>' + o.won + '</span></td>';
         standing_table_body += '<td><span>' + o.draw + '</span></td>';
         standing_table_body += '<td><span>' + o.lost + '</span></td>';
         standing_table_body += '</tr>';
       });
       standings_table_html += standing_table_body + '</tbody></table>';

       $("#standing_table").html(standings_table_html);
       $(".season_info").text(season_info);
       var ARR_LEAGUE_ID = LEAGUE_ID.split(", ");
       console.log(ARR_LEAGUE_ID);
       var league_list_html = '';
       $.each(ARR_LEAGUE_ID, function(i, o){
         league_list_html += '<li><a href="#" data-val="'+ o + '">' + o + '</a></li>';
       });
       $(".league_tab").remove();
       $("#standing_table").before('<ul class="league_tab">' + league_list_html + '</ul>');
   
       $(".league_tab li a").off("click").on("click", function(e){
         e.preventDefault();
         var data_val = $(this).data("val");
         console.log(data_val);
         standing_init(data_val); 
       });
     });
   }*/

  // 테이블 감싸기
  $(".table_wrap").each(function (idx) {
    console.log(idx);
    //.responsive_wrap .responsive_container > div
    console.log('<div class="responsive_wrap"><div class="responsive_container"><div>' + $(this).html() + '</div></div></div>');
    var table_html = '<div class="responsive_wrap"><div class="responsive_container"><div>' + $(this).html() + '</div></div></div>';
    $(this).html(table_html);
  });

  // h2로 목차 만들기
  console.log($("#wrap h2:not(.season_info)").length);
  if ($("#wrap h2:not(.season_info)").length) {
    $("body #wrap").append('<div class="link_box"><p><a href="#" class="view_table_of_content">목차보기</a></p><ul></ul></div>');
    $("#wrap .link_box").show();
    var link_html = '';
    $("#wrap h2").each(function (idx) {
      console.log($(this).text());
      $(this).prop("id", "link" + (idx + 1));
      link_html += '<li><a href="#link' + (idx + 1) + '">' + $(this).text() + '</a></li>';
    });

    $(".link_box ul").html(link_html);

    $("#wrap .link_box p a").off("click").on("click", function (e) {
      e.preventDefault();
      $("#wrap .link_box").toggleClass("on");
    });
  } else {
    $("#wrap .link_box").hide();
  }

});


$(function () {

});