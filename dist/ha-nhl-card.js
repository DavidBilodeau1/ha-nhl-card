import { html } from "https://unpkg.com/lit-html@2.0.0/lit-html.js?module";
import { LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";


class NHLCard extends LitElement {

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }
  getCardSize() {
    return 5;
  }
  
  render() {
    if (!this.hass || !this._config) {
      return html` <ha-card>Invalid Configuration</ha-card> `;
    }
	
    const stateObj = this.hass.states[this._config.entity];
    const outline = this._config.outline;
    const outlineColor = this._config.outline_color;
    const team_id = this._config.team_id;
	
    var homeTeamProb;
    var homeTeamLogo;
    var homeTeamColor;
    var hScr;
    var homeTeamRecord;
    var homeTeamStartingGoalie;
    var homeTeamScoreOpacity;
    var homeTeamGoalieOfRecord;
    var homeTeamGoalieOfRecordStats;
    var awayTeamProb;
    var awayTeamLogo;
    var awayTeamColor;
    var aScr;
    var awayTeamRecord;
    var awayTeamStartingGoalie;
    var awayTeamScoreOpacity;
    var awayTeamGoalieOfRecord;
    var awayTeamGoalieOfRecordStats;
    var tvNetwork;
    var gameNotes;
    var seriesSummary;
    var odds;
    var overunder;
	
    var outColor = outlineColor;

    if (stateObj.state == 'pre' || stateObj.state == 'in' || stateObj.state == 'post') {
      if (stateObj.attributes.home_team_odds_win_pct) {
        homeTeamProb = stateObj.attributes.home_team_odds_win_pct;
      } else {
        homeTeamProb = 50;
      }
			
      if (stateObj.attributes.away_team_odds_win_pct) {
        awayTeamProb = stateObj.attributes.away_team_odds_win_pct;
      } else {
        awayTeamProb = 50;
      }
	    
      homeTeamLogo = stateObj.attributes.home_team_logo;
      awayTeamLogo = stateObj.attributes.away_team_logo;

      awayTeamColor = stateObj.attributes.away_team_colors[1];
      homeTeamColor = stateObj.attributes.home_team_colors[0];

      if (stateObj.attributes.home_team_goals) {
        hScr = stateObj.attributes.home_team_goals;
      } else {
        hScr = 0;
      }
			
      if (stateObj.attributes.away_team_goals) {
        aScr = stateObj.attributes.away_team_goals;
      } else {
        aScr = 0;
      }
      
      if (stateObj.attributes.home_team_record) {
        homeTeamRecord = stateObj.attributes.home_team_record;
      } else {
        homeTeamRecord = '0-0-0';
      }

      if (stateObj.attributes.away_team_record) {
        awayTeamRecord = stateObj.attributes.away_team_record;
      } else {
        awayTeamRecord = '0-0-0';
      }

      if (stateObj.attributes.home_team_starting_goalie) {
        homeTeamStartingGoalie = stateObj.attributes.home_team_starting_goalie;
      } else {
        homeTeamStartingGoalie = 'Goalie: N/A';
      }

      if (stateObj.attributes.away_team_starting_goalie) {
        awayTeamStartingGoalie = stateObj.attributes.away_team_starting_goalie;
      } else {
        awayTeamStartingGoalie = 'Goalie: N/A';
      }

      if (stateObj.attributes.tv_network) {
        tvNetwork = stateObj.attributes.tv_network;
      } else {
        tvNetwork = '';
      }

      if (stateObj.attributes.game_notes) {
        gameNotes = stateObj.attributes.game_notes;
      } else {
        gameNotes = '';
      }

      if (stateObj.attributes.series_summary) {
        seriesSummary = stateObj.attributes.series_summary;
      } else {
        seriesSummary = '';
      }

			
      var dateForm = new Date (stateObj.attributes.date);
      var gameDay = dateForm.toLocaleDateString('en-US', { weekday: 'long' });
      var gameTime = dateForm.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' });
      var gameMonth = dateForm.toLocaleDateString('en-US', { month: 'short' });
      var gameDate = dateForm.toLocaleDateString('en-US', { day: '2-digit' });
			
      if (stateObj.attributes.odds) {
        odds = stateObj.attributes.odds;
      } else {
        odds = 'Odds: NA';
      }
			
      if (stateObj.attributes.overunder) {
        overunder = stateObj.attributes.overunder;
      } else {
        overunder = 'O/U: NA';
      }
			
      if (Boolean(stateObj.state == 'post') && Number(hScr) > Number(aScr)) {
        awayTeamScoreOpacity = 0.6;
        homeTeamScoreOpacity = 1;

        if (stateObj.attributes.winning_goalie) {
          homeTeamGoalieOfRecord = 'W: ' + stateObj.attributes.winning_goalie;
        } else {
          homeTeamGoalieOfRecord = 'Goalie: N/A';
        }
      
        if ((stateObj.attributes.winning_goalie_saves) && (stateObj.attributes.winning_goalie_save_pct)) {
          homeTeamGoalieOfRecordStats = stateObj.attributes.winning_goalie_saves + ' SV (' + stateObj.attributes.winning_goalie_save_pct + ')';
        } else {
          homeTeamGoalieOfRecordStats = 'Stats: N/A';
        }
      
        if (stateObj.attributes.losing_goalie) {
          awayTeamGoalieOfRecord = 'L: ' + stateObj.attributes.losing_goalie;
        } else {
          awayTeamGoalieOfRecord = 'Goalie: N/A';
        }
      
        if ((stateObj.attributes.losing_goalie_saves) && (stateObj.attributes.losing_goalie_save_pct)) {
          awayTeamGoalieOfRecordStats = stateObj.attributes.losing_goalie_saves + ' SV (' + stateObj.attributes.losing_goalie_save_pct + ')';
        } else {
          awayTeamGoalieOfRecordStats = 'Stats: N/A';
        }
      } else if (Boolean(stateObj.state == 'post') && Number(hScr) < Number(aScr)) {
        awayTeamScoreOpacity = 1;
        homeTeamScoreOpacity = 0.6;

        if (stateObj.attributes.losing_goalie) {
          homeTeamGoalieOfRecord = 'L: ' + stateObj.attributes.losing_goalie;
        } else {
          homeTeamGoalieOfRecord = 'Goalie: N/A';
        }
        
        if ((stateObj.attributes.losing_goalie_saves) && (stateObj.attributes.losing_goalie_save_pct)) {
          homeTeamGoalieOfRecordStats = stateObj.attributes.losing_goalie_saves + ' SV (' + stateObj.attributes.losing_goalie_save_pct + ')';
        } else {
          homeTeamGoalieOfRecordStats = 'Stats N/A';
        }
        
        if (stateObj.attributes.winning_goalie) {
          awayTeamGoalieOfRecord = 'W: ' + stateObj.attributes.winning_goalie;
        } else {
          awayTeamGoalieOfRecord = 'Goalie: N/A';
        }
        
        if ((stateObj.attributes.winning_goalie_saves) && (stateObj.attributes.winning_goalie_save_pct)) {
          awayTeamGoalieOfRecordStats = stateObj.attributes.winning_goalie_saves + ' SV (' + stateObj.attributes.winning_goalie_save_pct + ')';
        } else {
          awayTeamGoalieOfRecordStats = 'Stats: N/A';
        }
      } else if (Boolean(stateObj.state == 'post') && Number(hScr) == Number(aScr)) {
        awayTeamScoreOpacity = 1;
        homeTeamScoreOpacity = 1;
				
        if (stateObj.attributes.winning_goalie) {
          homeTeamGoalieOfRecord = 'T: ' + stateObj.attributes.winning_goalie;
        } else {
          homeTeamGoalieOfRecord = 'Goalie: N/A';
        }
				
        if ((stateObj.attributes.winning_goalie_saves) && (stateObj.attributes.winning_goalie_save_pct)) {
          homeTeamGoalieOfRecordStats = stateObj.attributes.winning_goalie_saves + ' SV (' + stateObj.attributes.winning_goalie_save_pct + ')';
        } else {
          homeTeamGoalieOfRecordStats = 'Stats: N/A';
        }
				
        if (stateObj.attributes.losing_goalie) {
          awayTeamGoalieOfRecord = 'T: ' + stateObj.attributes.losing_goalie;
        } else {
          awayTeamGoalieOfRecord = 'Goalie: N/A';
        }
				
        if ((stateObj.attributes.losing_goalie_saves) && (stateObj.attributes.losing_goalie_save_pct)) {
          awayTeamGoalieOfRecordStats = stateObj.attributes.losing_goalie_saves + ' SV (' + stateObj.attributes.losing_goalie_save_pct + ')';
        } else {
          awayTeamGoalieOfRecordStats = 'Stats: N/A';
        }
				
      } else if (Boolean(stateObj.state == 'in')) {
        awayTeamScoreOpacity = 1;
        homeTeamScoreOpacity = 1;
      }
    } else {
      homeTeamLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8rGHWIehoVzpadKbNwJhQ_IxdUbKv81ed06p_3fRsSvmJzluS';
      awayTeamLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8rGHWIehoVzpadKbNwJhQ_IxdUbKv81ed06p_3fRsSvmJzluS';
      hScr = 0;
      aScr = 0;
    }

    if (outline == true) {
      var clrOut = 1;
      var toRadius = 4;
      var probRadius = 7;
    }
    
    if (!this._config.outline || outline == false){
      var clrOut = 0;
      var toRadius = 3;
      var probRadius = 6;
    }
    if (!this._config.outline_color) {
      var outColor = '#ffffff';
    }
    
    if (!stateObj) {
      return html` <ha-card>Unknown entity: ${this._config.entity}</ha-card> `;
    } else {
      if (stateObj.state == 'unavailable') {
        return html`
          <style>
            ha-card {padding: 10px 16px;}
          </style>
          <ha-card>
            Sensor unavailable: ${this._config.entity}
          </ha-card> 
        `;
      } else if (stateObj.state == 'pre') {
			return html`
			  <style>
				.card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
				.away-team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
				.home-team-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
				.card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
				.team { text-align: center; width: 35%; }
				.team img { height: 90px; }
				.name { font-size: 1.4em; margin-bottom: 4px; }
				.record { text-align: center; }
				.goalie { text-align: center; }
				.line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
				.gameday { font-size: 1.4em; margin-bottom: 4px; }
				.gametime { font-size: 1.1em; }
				.sub1 { font-weight: 500; font-size: 1.2em; margin: 6px 0 2px; }
				.sub1, .sub2, .sub3, .sub4 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
				.date { text-align: left; }
				.odds { text-align: right; }
				.venue { text-align: left; }
				.overunder { text-align: right; }
				.location { text-align: left; }
				.network { text-align: right; }
				.gamenotes { text-align: left; }
				.seriessummary { text-align: right; }
				.probability-text { text-align: center; }
				.prob-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
				.away-team-probability { width: ${awayTeamProb}%; background-color: ${awayTeamColor}; height: 12px; border-radius: 0 ${probRadius}px ${probRadius}px 0; border: ${clrOut}px solid ${outColor}; border-left: 0; transition: all 1s ease-out; }
				.home-team-probability { width: ${homeTeamProb}%; background-color: ${homeTeamColor}; height: 12px; border-radius: ${probRadius}px 0 0 ${probRadius}px; border: ${clrOut}px solid ${outColor}; border-right: 0; transition: all 1s ease-out; }
				.probability-wrapper { display: flex; }
				.away-team-percent { flex: 0 0 10px; padding: 0 10px 0 0; }
				.home-team-percent { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; }
				.percent { padding: 0 6px; }
			  </style>
			  <ha-card>
				  <div class="card">
				    <img class="away-team-bg" src="${awayTeamLogo}" />
				    <img class="home-team-bg" src="${homeTeamLogo}" />
				    
				    <div class="card-content">
					    <div class="team">
					      <img src="${awayTeamLogo}" />
					      <div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					      <div class="record">${awayTeamRecord}</div>
					      <div class="goalie">${awayTeamStartingGoalie}</div>
					    </div>
					    <div class="gamewrapper">
					      <div class="gameday">${gameDay}</div>
					      <div class="gametime">${gameTime}</div>
					    </div>
					    <div class="team">
					      <img src="${homeTeamLogo}" />
					      <div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					      <div class="record">${homeTeamRecord}</div>
					      <div class="goalie">${homeTeamStartingGoalie}</div>
					    </div>
				    </div>
				    
				    <div class="line"></div>
				    
				    <div class="sub1">
					    <div class="date">Puck drop ${stateObj.attributes.puck_drop_in}</div>
					    <div class="odds">${odds}</div>
				    </div>
				    <div class="sub2">
					    <div class="venue">${stateObj.attributes.venue_name}</div>
					    <div class="overunder">${overunder}</div>
				    </div>
				    <div class="sub3">
					    <div class="location">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
					    <div class="network">${tvNetwork}</div>
				    </div>
				    <div class="sub4">
				      <div class="gamenotes">${gameNotes}</div>
				      <div class="seriessummary">${seriesSummary}</div>
				    </div>			    
				    <div class="probability-text">Win Probability</div>
				    <div class="probability-wrapper">
				      <div class="away-team-percent">${awayTeamProb}%</div>
				      <div class="prob-flex">
					      <div class="away-team-probability"></div>
					      <div class="home-team-probability"></div>
				      </div>
				      <div class="home-team-percent">${homeTeamProb}%</div>
				    </div>
				    
				  </div>
				</ha-card>
			`;
      } else if (stateObj.state == 'post') {
		  return html`
			<style>
				.card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
				.away-team-bg { opacity: 0.08; position: absolute; top: -30%; left: -20%; width: 58%; z-index: 0; }
				.home-team-bg { opacity: 0.08; position: absolute; top: -30%; right: -20%; width: 58%; z-index: 0; }
				.card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
				.team { text-align: center; width: 35%;}
				.team img { height: 90px; }
				.teamls { text-align: center; }
				.teamls img { height: 15px; }
				.score { font-size: 3em; text-align: center; }
				.hometeamscr { opacity: ${homeTeamScoreOpacity}; }
				.awayteamscr { opacity: ${awayTeamScoreOpacity}; }
				.divider { font-size: 2.5em; text-align: center; opacity: 0; }
				.name { font-size: 1.4em; margin-bottom: 4px; }
				.record { text-align: center; }
				.goalie { text-align: center; }
				.line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
				.status { font-size: 1.2em; text-align: center; margin-top: -21px; }
				.sub1, .sub2, .sub3, .sub4 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
				.venue { text-align: left; }
				.location { text-align: right; }
				.gamenotes { text-align: left; }
				.seriessummary { text-align: right; }
				.line-score-table { width: 100%; border-collapse: collapse; text-align: center; }
				.line-score-cell { border: 0.5px solid #999; text-align: center; }
				table.ls { width: 100%; text-align: center; border: 0.5px solid #999; border-collapse: collapse; }
				th, td, tr { border: 0.5px solid #999; text-align: center; border-collapse: collapse; }
				th.teamls, td.teamls { border: 0.5px solid #999; text-align: left; width: 20%; border-collapse: collapse; }
			</style>
			<ha-card>
			  <div class="card">
				<img class="away-team-bg" src="${awayTeamLogo}" />
				<img class="home-team-bg" src="${homeTeamLogo}" />
				<div class="card-content">
				  <div class="team">
					<img src="${awayTeamLogo}" />
					<div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					<div class="record">${awayTeamRecord}</div>
					<div class="goalie">${awayTeamGoalieOfRecord}<br>${awayTeamGoalieOfRecordStats}</div>
				  </div>
				  <div class="score awayteamscr">${aScr}</div>
				  <div class="divider">-</div>
				  <div class="score hometeamscr">${hScr}</div>
				  <div class="team">
					<img src="${homeTeamLogo}" />
					<div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					<div class="record">${homeTeamRecord}</div>
					<div class="goalie">${homeTeamGoalieOfRecord}<br>${homeTeamGoalieOfRecordStats}</div>
				  </div>
				</div>
				<div class="status">FINAL</div>
				<div class="line"></div>
				<div class="sub2">
				  <div class="venue">${stateObj.attributes.venue_name}</div>
				  <div class="location">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
				</div>

				<div class="sub3">
				  <div class="gamenotes">${gameNotes}</div>
				  <div class="seriessummary">${seriesSummary}</div>
				</div>

				<div class="line"></div>
				  <table class="ls">
					  <thead>
					    <tr>
						    <th class="teamls">Scoring</th>
						    <th>1</th>
						    <th>2</th>
						    <th>3</th>
                                                    <th>OT</th>
						    <th>T</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
						    <td class="teamls"><img src="${awayTeamLogo}" style="height:15px;" />&nbsp; ${stateObj.attributes.away_team_abbr}</td>
						    <td>${stateObj.attributes.away_team_ls_1}</td>
						    <td>${stateObj.attributes.away_team_ls_2}</td>
						    <td>${stateObj.attributes.away_team_ls_3}</td>
                                                    <td>${stateObj.attributes.away_team_ls_ot}</td>
						    <td>${stateObj.attributes.away_team_goals}</td>
					    </tr>
					    <tr>
						    <td class="teamls"><img src="${homeTeamLogo}" style="height:15px;" />&nbsp; ${stateObj.attributes.home_team_abbr}</td>
						    <td>${stateObj.attributes.home_team_ls_1}</td>
						    <td>${stateObj.attributes.home_team_ls_2}</td>
						    <td>${stateObj.attributes.home_team_ls_3}</td>
                                                    <td>${stateObj.attributes.home_team_ls_ot}</td>
						    <td>${stateObj.attributes.home_team_goals}</td>
					    </tr>
					  </tbody>
				  </table>
				  <div class="line">${stateObj.attributes.headlines}</div>
			  </div>
			</ha-card>
		  `;
      } else if (stateObj.state == 'in') {
			return html`
			  <style>
				.card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
				.away-team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
				.home-team-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
				.card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
				.team { text-align: center; width:35%; }
				.team img { height: 90px; }
				.teamls { text-align: center; }
				.teamls img { height: 15px; }
				.score { font-size: 3em; text-align: center; }
				.divider { font-size: 2.5em; text-align: center; margin: 0 4px; }
				.name { font-size: 1.4em; margin-bottom: 4px; }
				.line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
				.status { text-align:center; font-size:1.6em; font-weight: 700; }
				.sub1 { font-weight: 700; font-size: 1.2em; margin: 6px 0 2px; }
				.sub1, .sub2, .sub3, .sub4 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
				.last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
				.last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide 18s linear infinite; }
				@keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
				.game-status { font-size: 1.4em; text-align: center; margin-top: -24px; }
				.probability-text { text-align: center; }
				.prob-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
				.probability-wrapper { display: flex; }
				.away-team-percent { flex: 0 0 10px; padding: 0 10px 0 0; }
				.home-team-percent { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; }
				.percent { padding: 0 6px; }
				.post-game { margin: 0 auto; }
				.venue { text-align: left; }
				.weather { text-align: right; }
				.location { text-align: left; }
				.network { text-align: right; }
				.gamenotes { text-align: left; }
				.seriessummary { text-align: right; }
				.line-score-table { width: 100%; border-collapse: collapse; text-align: center; }
				.line-score-cell { border: 0.5px solid #999; text-align: center; }
				table.ls { width: 100%; text-align: center; border: 0.5px solid #999; border-collapse: collapse; }
				th, td { border: 0.5px solid #999; text-align: center; }
				th.teamls, td.teamls { border: 0.5px solid #999; text-align: left; }
             
			  </style>
			  <ha-card>
				<div class="card">
				<img class="away-team-bg" src="${awayTeamLogo}" />
    			<img class="home-team-bg" src="${homeTeamLogo}" />
    			
				<div class="card-content">
				  <div class="team">
					<img src="${awayTeamLogo}" />
					<div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					<div class="record">${awayTeamRecord}</div>
				  </div>
				  <div class="score">${aScr}</div>
				  <div class="divider">-</div>
				  <div class="score">${hScr}</div>
				  <div class="team">
					<img src="${homeTeamLogo}" />
					<div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					<div class="record">${homeTeamRecord}</div>
				  </div>
				</div>
				
				<div class="game-status">${stateObj.attributes.game_status}</div>
				<div class="line"></div>
				
				<div class="sub2">
				  <div class="venue">${stateObj.attributes.venue_name}</div>
				  <div class="weather">&nbsp;</div>
				</div>
				<div class="sub3">
				  <div class="location">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
				  <div class="network">${stateObj.attributes.tv_network}</div>
				</div>
				<div class="sub4">
				  <div class="gamenotes">${gameNotes}</div>
				  <div class="seriessummary">${seriesSummary}</div>
				</div>

				<div class="line"></div>
				<div class="last-play">
				  <p>${stateObj.attributes.last_play}</p>
				</div>
				
				<div class="probability-text">
				   <table class="ls">
					 <thead>
					   <tr>
						 <th class="teamls">Scoring</th>
						 <th>1</th>
						 <th>2</th>
						 <th>3</th>
                                                 <th>OT</th>
						 <th>T</th>
					   </tr>
					 </thead>
					 <tbody>
					   <tr>
						 <td class="teamls"><img src="${awayTeamLogo}" style="height:15px;" />&nbsp; ${stateObj.attributes.away_team_abbr}</td>
						 <td>${stateObj.attributes.away_team_ls_1}</td>
						 <td>${stateObj.attributes.away_team_ls_2}</td>
						 <td>${stateObj.attributes.away_team_ls_3}</td>
                                                 <td>${stateObj.attributes.away_team_ls_ot}</td>
						 <td>${stateObj.attributes.away_team_goals}</td>
					   </tr>
					   <tr>
						 <td class="teamls"><img src="${homeTeamLogo}" style="height:15px;"/>&nbsp; ${stateObj.attributes.home_team_abbr}</td>
						 <td>${stateObj.attributes.home_team_ls_1}</td>
						 <td>${stateObj.attributes.home_team_ls_2}</td>
						 <td>${stateObj.attributes.home_team_ls_3}</td>
                                                 <td>${stateObj.attributes.home_team_ls_ot}</td>
						 <td>${stateObj.attributes.home_team_goals}</td>
					   </tr>
					 </tbody>
				   </table>
				</div>
				
			  </div>
			  </ha-card>
			`;
      } else /*if (stateObj.state == 'Unknown')*/ {
		  return html`
			<style>
			  .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
			  .team-bg { opacity: 0.08; position: absolute; top: -50%; left: -30%; width: 75%; z-index: 0; }
			  .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
			  .team { text-align: center; width: 50%; }
			  .team img { max-width: 90px; }
			  .name { font-size: 1.6em; margin-bottom: 4px; }
			  .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
			  .eos { font-size: 1.8em; line-height: 1.2em; text-align: center; width: 50%; }
			</style>
			<ha-card>
			  <div class="card">
				<img class="team-bg" src="https://a.espncdn.com/i/teamlogos/nhl/500/scoreboard/${team_id}.png" />
				<div class="card-content">
				  <div class="team">
					<img src="https://a.espncdn.com/i/teamlogos/nhl/500/scoreboard/${team_id}.png" />
				  </div>
				  <div class="eos">No Game<br />Scheduled Today</div>
				</div>
			  </div>
			</ha-card>
		  `;
		}
	}

	

  }
}

customElements.define("nhl-card", NHLCard);

