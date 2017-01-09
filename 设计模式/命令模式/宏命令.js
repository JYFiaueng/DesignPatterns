var aCommand = {
	execute: function(){
		console.log('aCommand');
	}
};
var bCommand = {
	execute: function(){
		console.log('bCommand');
	}
};
var cCommand = {
	execute: function(){
		console.log('cCommand');
	}
};
//中心处理函数
var MacroCommand = function(){
	return {
		commandsList: [],
		add: function(command){
			this.commandsList.push(command);
		},
		execute: function(){
			for(var i = 0, command; command = this.commandsList[i++]; ){
				command.execute();
			}
		}
	};
};

var macroCommand = MacroCommand();
macroCommand.add(aCommand);
macroCommand.add(bCommand);
macroCommand.add(cCommand);

macroCommand.execute();