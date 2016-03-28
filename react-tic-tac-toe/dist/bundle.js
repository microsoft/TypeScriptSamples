/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Board_1 = __webpack_require__(3);
	var RestartBtn_1 = __webpack_require__(5);
	var GameStateBar_1 = __webpack_require__(6);
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.apply(this, arguments);
	    }
	    App.prototype.render = function () {
	        return (React.createElement("div", {className: "app"}, React.createElement(Board_1.Board, null), React.createElement("div", null, React.createElement("span", {className: "description t1"}, " Player(X) "), React.createElement("span", {className: "description t2"}, " Computer(O) ")), React.createElement(RestartBtn_1.RestartBtn, null), React.createElement(GameStateBar_1.GameStateBar, null)));
	    };
	    return App;
	}(React.Component));
	ReactDOM.render(React.createElement(App, null), document.getElementById("content"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var constants_1 = __webpack_require__(4);
	var Board = (function (_super) {
	    __extends(Board, _super);
	    function Board(props) {
	        _super.call(this, props);
	        this.state = this.getInitState();
	    }
	    Board.prototype.getInitState = function () {
	        var cells = Array.apply(null, Array(9)).map(function () { return ""; });
	        return { cells: cells, gameState: "" };
	    };
	    Board.prototype.resetState = function () {
	        this.setState(this.getInitState());
	    };
	    Board.prototype.componentDidMount = function () {
	        var _this = this;
	        window.addEventListener("restart", function () { return _this.resetState(); });
	    };
	    Board.prototype.componentWillUnmount = function () {
	        var _this = this;
	        window.removeEventListener("restart", function () { return _this.resetState(); });
	    };
	    // Fire a global event notifying GameState changes
	    Board.prototype.handleGameStateChange = function (newState) {
	        var event = new CustomEvent("gameStateChange", { "detail": this.state.gameState });
	        event.initEvent("gameStateChange", false, true);
	        window.dispatchEvent(event);
	    };
	    // check the game state - use the latest move
	    Board.prototype.checkGameState = function (cells, latestPos, latestVal) {
	        if (this.state.gameState !== "") {
	            return this.state.gameState;
	        }
	        // check row
	        var result = this.check3Cells(cells, 3 * Math.floor(latestPos / 3), 3 * Math.floor(latestPos / 3) + 1, 3 * Math.floor(latestPos / 3) + 2);
	        if (result) {
	            return result;
	        }
	        // check col
	        result = this.check3Cells(cells, latestPos % 3, latestPos % 3 + 3, latestPos % 3 + 6);
	        if (result) {
	            return result;
	        }
	        // check diag
	        result = this.check3Cells(cells, 0, 4, 8);
	        if (result) {
	            return result;
	        }
	        result = this.check3Cells(cells, 2, 4, 6);
	        if (result) {
	            return result;
	        }
	        // check draw - if all cells are filled
	        if (this.findAllEmptyCells(cells).length === 0) {
	            return "Draw";
	        }
	        return "";
	    };
	    // check if 3 cells have same non-empty val - return the winner state; otherwise undefined 
	    Board.prototype.check3Cells = function (cells, pos0, pos1, pos2) {
	        if (cells[pos0] === cells[pos1] &&
	            cells[pos1] === cells[pos2] &&
	            cells[pos0] !== "") {
	            if (cells[pos0] === "X") {
	                return "X Wins!";
	            }
	            return "O Wins!";
	        }
	        else {
	            return undefined;
	        }
	    };
	    // list all empty cell positions
	    Board.prototype.findAllEmptyCells = function (cells) {
	        return cells.map(function (v, i) {
	            if (v === "") {
	                return i;
	            }
	            else {
	                return undefined;
	            }
	        }).filter(function (v) { return v !== undefined; });
	    };
	    // make a move
	    Board.prototype.move = function (pos, val, callback) {
	        var _this = this;
	        if (this.state.gameState === "" &&
	            this.state.cells[pos] === "") {
	            var newCells = this.state.cells.slice();
	            newCells[pos] = val;
	            var oldState_1 = this.state.gameState;
	            this.setState({ cells: newCells, gameState: this.checkGameState(newCells, pos, val) }, function () {
	                if (_this.state.gameState !== oldState_1) {
	                    _this.handleGameStateChange(_this.state.gameState);
	                }
	                if (callback) {
	                    callback.call(_this);
	                }
	            });
	        }
	    };
	    // AI make a random move
	    Board.prototype.aiMove = function () {
	        var emptyCells = this.findAllEmptyCells(this.state.cells);
	        var pos = emptyCells[Math.floor(Math.random() * emptyCells.length)];
	        this.move(pos, constants_1.aiCell);
	    };
	    // handle a new move from player
	    Board.prototype.handleNewPlayerMove = function (pos) {
	        this.move(pos, constants_1.playerCell, this.aiMove);
	    };
	    Board.prototype.render = function () {
	        var _this = this;
	        var cells = this.state.cells.map(function (v, i) {
	            return (React.createElement(Cell, {key: i, pos: i, val: v, handleMove: function () { return _this.handleNewPlayerMove(i); }}));
	        });
	        return (React.createElement("div", {className: "board"}, cells));
	    };
	    return Board;
	}(React.Component));
	exports.Board = Board;
	var Cell = (function (_super) {
	    __extends(Cell, _super);
	    function Cell() {
	        _super.apply(this, arguments);
	    }
	    // position of cell to className
	    Cell.prototype.posToClassName = function (pos) {
	        var className = "cell";
	        switch (Math.floor(pos / 3)) {
	            case 0:
	                className += " top";
	                break;
	            case 2:
	                className += " bottom";
	                break;
	            default: break;
	        }
	        switch (pos % 3) {
	            case 0:
	                className += " left";
	                break;
	            case 2:
	                className += " right";
	                break;
	            default: break;
	        }
	        return className;
	    };
	    Cell.prototype.handleClick = function (e) {
	        this.props.handleMove();
	    };
	    Cell.prototype.render = function () {
	        var _this = this;
	        var name = this.props.val;
	        if (this.props.val === "") {
	            name = "";
	        }
	        return React.createElement("div", {className: this.posToClassName(this.props.pos), onClick: function (e) { return _this.handleClick(e); }}, React.createElement("div", {className: name}, " ", this.props.val, " "));
	    };
	    return Cell;
	}(React.Component));


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.playerCell = "X";
	exports.aiCell = "O";


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var RestartBtn = (function (_super) {
	    __extends(RestartBtn, _super);
	    function RestartBtn() {
	        _super.apply(this, arguments);
	    }
	    // Fire a global event notifying restart of game
	    RestartBtn.prototype.handleClick = function (e) {
	        var event = document.createEvent("Event");
	        event.initEvent("restart", false, true);
	        window.dispatchEvent(event);
	    };
	    RestartBtn.prototype.render = function () {
	        var _this = this;
	        return React.createElement("a", {href: "#", className: "restartBtn", onClick: function (e) { return _this.handleClick(e); }}, "Restart");
	    };
	    return RestartBtn;
	}(React.Component));
	exports.RestartBtn = RestartBtn;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var GameStateBar = (function (_super) {
	    __extends(GameStateBar, _super);
	    function GameStateBar(props) {
	        _super.call(this, props);
	        this.state = { gameState: "" };
	    }
	    GameStateBar.prototype.handleGameStateChange = function (e) {
	        this.setState({ gameState: e.detail });
	    };
	    GameStateBar.prototype.handleRestart = function (e) {
	        this.setState({ gameState: "" });
	    };
	    GameStateBar.prototype.componentDidMount = function () {
	        var _this = this;
	        window.addEventListener("gameStateChange", function (e) { return _this.handleGameStateChange(e); });
	        window.addEventListener("restart", function (e) { return _this.handleRestart(e); });
	    };
	    GameStateBar.prototype.componentWillUnmount = function () {
	        var _this = this;
	        window.removeEventListener("gameStateChange", function (e) { return _this.handleGameStateChange(e); });
	        window.removeEventListener("restart", function (e) { return _this.handleRestart(e); });
	    };
	    GameStateBar.prototype.render = function () {
	        return (React.createElement("div", {className: "gameStateBar"}, " ", this.state.gameState, " "));
	    };
	    return GameStateBar;
	}(React.Component));
	exports.GameStateBar = GameStateBar;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map