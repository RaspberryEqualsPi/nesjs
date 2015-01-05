var RAM 			= require('./ram');

function CPU (nes) {
// ----------------------------------------------------------------
	var me = this;
	var m_Console 	= nes;	
	var m_Memory	= new RAM();
	var opTable 	= new Array();
	var pc;
	var sp;
	var a;
	var x;
	var y;
	var p;
// ----------------------------------------------------------------
	// ADC
	opTable[0x69] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x65] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x75] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x6D] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x7D] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x79] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x61] = function (addr) { me.ExecuteADC(addr); };
	opTable[0x71] = function (addr) { me.ExecuteADC(addr); };

	// AND
	opTable[0x29] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x25] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x35] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x2D] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x3D] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x39] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x21] = function (addr) { me.ExecuteAND(addr); };
	opTable[0x31] = function (addr) { me.ExecuteAND(addr); };

	// ASL
	opTable[0x0A] = function (addr) { me.ExecuteASL(addr); };
	opTable[0x06] = function (addr) { me.ExecuteASL(addr); };
	opTable[0x16] = function (addr) { me.ExecuteASL(addr); };
	opTable[0x0E] = function (addr) { me.ExecuteASL(addr); };
	opTable[0x1E] = function (addr) { me.ExecuteASL(addr); };
	
	// BCC
	opTable[0x90] = function (addr) { me.ExecuteBCC(addr); };

	// BCS
	opTable[0xB0] = function (addr) { me.ExecuteBCS(addr); };

	// BEQ
	opTable[0xF0] = function (addr) { me.ExecuteBEQ(addr); };

	// BIT
	opTable[0x24] = function (addr) { me.ExecuteBIT(addr); };
	opTable[0x2C] = function (addr) { me.ExecuteBIT(addr); };

	// BMI
	opTable[0x30] = function (addr) { me.ExecuteBMI(addr); };

	// BNE
	opTable[0xD0] = function (addr) { me.ExecuteBNE(addr); };

	// BPL
	opTable[0x10] = function (addr) { me.ExecuteBPL(addr); };

	// BRK
	opTable[0x00] = function (addr) { me.ExecuteBRK(addr); };

	// BVC
	opTable[0x50] = function (addr) { me.ExecuteBVC(addr); };

	// BVS
	opTable[0x70] = function (addr) { me.ExecuteBVS(addr); };

	// CLC
	opTable[0x18] = function (addr) { me.ExecuteCLC(addr); };

	// CLD
	opTable[0xD8] = function (addr) { me.ExecuteCLD(addr); };

	// CLI
	opTable[0x58] = function (addr) { me.ExecuteCLI(addr); };

	// CLV
	opTable[0xB8] = function (addr) { me.ExecuteCLV(addr); };

	// CMP
	opTable[0xC9] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xC5] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xD5] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xCD] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xDD] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xD9] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xC1] = function (addr) { me.ExecuteCMP(addr); };
	opTable[0xD1] = function (addr) { me.ExecuteCMP(addr); };

	// CPX
	opTable[0xE0] = function (addr) { me.ExecuteCPX(addr); };
	opTable[0xE4] = function (addr) { me.ExecuteCPX(addr); };
	opTable[0xEC] = function (addr) { me.ExecuteCPX(addr); };

	// CPY
	opTable[0xC0] = function (addr) { me.ExecuteCPY(addr); };
	opTable[0xC4] = function (addr) { me.ExecuteCPY(addr); };
	opTable[0xCC] = function (addr) { me.ExecuteCPY(addr); };

	// DEC
	opTable[0xC6] = function (addr) { me.ExecuteDEC(addr); };
	opTable[0xD6] = function (addr) { me.ExecuteDEC(addr); };
	opTable[0xCE] = function (addr) { me.ExecuteDEC(addr); };
	opTable[0xDE] = function (addr) { me.ExecuteDEC(addr); };

	// DEX
	opTable[0xCA] = function (addr) { me.ExecuteDEX(addr); };

	// DEY
	opTable[0x88] = function (addr) { me.ExecuteDEY(addr); };

	// EOR
	opTable[0x49] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x45] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x55] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x4D] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x5D] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x59] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x41] = function (addr) { me.ExecuteEOR(addr); };
	opTable[0x51] = function (addr) { me.ExecuteEOR(addr); };

	// INC
	opTable[0xE6] = function (addr) { me.ExecuteINC(addr); };
	opTable[0xF6] = function (addr) { me.ExecuteINC(addr); };
	opTable[0xEE] = function (addr) { me.ExecuteINC(addr); };
	opTable[0xFE] = function (addr) { me.ExecuteINC(addr); };

	// INX
	opTable[0xE8] = function (addr) { me.ExecuteINX(addr); };

	// INY
	opTable[0xC8] = function (addr) { me.ExecuteINY(addr); };

	// JMP
	opTable[0x4C] = function (addr) { me.ExecuteJMP(addr); };
	opTable[0x6C] = function (addr) { me.ExecuteJMP(addr); };

	// JSR
	opTable[0x20] = function (addr) { me.ExecuteJSR(addr); };

	// LDA
	opTable[0xA9] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xA5] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xB5] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xAD] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xBD] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xB9] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xA1] = function (addr) { me.ExecuteLDA(addr); };
	opTable[0xB1] = function (addr) { me.ExecuteLDA(addr); };

	// LDX
	opTable[0xA2] = function (addr) { me.ExecuteLDX(addr); };
	opTable[0xA6] = function (addr) { me.ExecuteLDX(addr); };
	opTable[0xB6] = function (addr) { me.ExecuteLDX(addr); };
	opTable[0xAE] = function (addr) { me.ExecuteLDX(addr); };
	opTable[0xBE] = function (addr) { me.ExecuteLDX(addr); };

	// LDY
	opTable[0xA0] = function (addr) { me.ExecuteLDY(addr); };
	opTable[0xA4] = function (addr) { me.ExecuteLDY(addr); };
	opTable[0xB4] = function (addr) { me.ExecuteLDY(addr); };
	opTable[0xAC] = function (addr) { me.ExecuteLDY(addr); };
	opTable[0xBC] = function (addr) { me.ExecuteLDY(addr); };

	// LSR
	opTable[0x4A] = function (addr) { me.ExecuteLSR(addr); };
	opTable[0x46] = function (addr) { me.ExecuteLSR(addr); };
	opTable[0x56] = function (addr) { me.ExecuteLSR(addr); };
	opTable[0x4E] = function (addr) { me.ExecuteLSR(addr); };
	opTable[0x5E] = function (addr) { me.ExecuteLSR(addr); };

	// NOP
	opTable[0xEA] = function (addr) { me.ExecuteNOP(addr); };

	// ORA
	opTable[0x09] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x05] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x15] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x0D] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x1D] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x19] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x01] = function (addr) { me.ExecuteORA(addr); };
	opTable[0x11] = function (addr) { me.ExecuteORA(addr); };

	// PHA
	opTable[0x48] = function (addr) { me.ExecutePHA(addr); };

	// PHP
	opTable[0x08] = function (addr) { me.ExecutePHP(addr); };

	// PLA
	opTable[0x68] = function (addr) { me.ExecutePLA(addr); };

	// PLP
	opTable[0x28] = function (addr) { me.ExecutePLP(addr); };

	// ROL
	opTable[0x2A] = function (addr) { me.ExecuteROL(addr); };
	opTable[0x26] = function (addr) { me.ExecuteROL(addr); };
	opTable[0x36] = function (addr) { me.ExecuteROL(addr); };
	opTable[0x2E] = function (addr) { me.ExecuteROL(addr); };
	opTable[0x3E] = function (addr) { me.ExecuteROL(addr); };

	// ROR
	opTable[0x6A] = function (addr) { me.ExecuteROR(addr); };
	opTable[0x66] = function (addr) { me.ExecuteROR(addr); };
	opTable[0x76] = function (addr) { me.ExecuteROR(addr); };
	opTable[0x6E] = function (addr) { me.ExecuteROR(addr); };
	opTable[0x7E] = function (addr) { me.ExecuteROR(addr); };

	// RTI
	opTable[0x40] = function (addr) { me.ExecuteRTI(addr); };

	// RTS
	opTable[0x60] = function (addr) { me.ExecutePTS(addr); };

	// SBC
	opTable[0xE9] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xE5] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xF5] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xED] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xFD] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xF9] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xE1] = function (addr) { me.ExecuteSBC(addr); };
	opTable[0xE1] = function (addr) { me.ExecuteSBC(addr); };

	// SEC
	opTable[0x38] = function (addr) { me.ExecuteSEC(addr); };

	// SED
	opTable[0xF8] = function (addr) { me.ExecuteSED(addr); };

	// SEI
	opTable[0x78] = function (addr) { me.ExecuteSEI(addr); };

// ----------------------------------------------------------------
	function setCarryFlag () {
		p = p | 1;
	}

	function unsetCarryFlag () {
		p = p & ~1;
	}

	function setZeroFlag () {
		p = p | 2;
	}

	function unsetZeroFlag () {
		p = p & ~2;
	}

	function setInterruptDisable () {
		p = p | 4;
	}

	function unsetInterruptDisable () {
		p = p & ~4;
	}

	function setDecimalMode () {
		p = p | 8;
	}

	function unsetDecimalMode () {
		p = p &~ 8;
	}

	function setBreakCommand () {
		p = p | 16;
	}

	function unsetBreakCommand () {
		p = p & ~16;
	}

	function setOverflowFlag () {
		p = p | 64;
	}

	function unsetOverflowFlag () {
		p = p & ~64;
	}

	function setNegativeFlag () {
		p = p | 128;
	}

	function unsetNegativeFlag () {
		p = p & ~128;
	}

	function isCarrySet () {
		return (p & 1) === 1;
	}

	function isZeroSet () {
		return (p & 2) === 1;
	}

	function isInterruptDisableSet () {
		return (p & 4) === 1;
	}

	function isDecimalModeSet () {
		return (p & 8) === 1;
	}

	function isBreakFlagSet () {
		return (p & 16) === 1;
	}

	function isOverflowFlagSet () {
		return (p & 64) === 1;
	}	

	function isNegativeFlagSet () {
		return (p & 128) === 1;
	}

// ----------------------------------------------------------------

	this.ExecuteADC = function (addr) {
		var value = m_Memory.Get(addr);					// Get value of memory address
		a = a + value + (p & 0);						// Add Accumulator to value and Carry Flag value
		var sign = a & 128;
		if(a > 255) { setCarryFlag(); }					// Greater than 255 - set Carry Flag
		if(a & 128) { setNegativeFlag(); }				// Negative number - set Negative Flag
		if(a === 0) { setZeroFlag(); }					// Value is zero - set Zero Flag
		if((a & 128) != sign) { setOverflowFlag(); } 	// Sign is incorrect - set Overflow flag
	}

	this.ExecuteAND = function (addr) {
		var value = m_Memory.Get(addr);
		a = a & value;
		if(a === 0) { setZeroFlag(); }
		if(a & 128) { setNegativeFlag(); }
	}

	this.ExecuteASL = function (addr) {
		var value = m_Memory.Get(addr);
		a = value * 2;
		(value & 128) === 0 ? unsetCarryFlag() : setCarryFlag();
		if(value & 128) { setNegativeFlag(); }
		if(a === 0) { setZeroFlag(); }
	}

	this.ExecuteBCC = function (value) {
		if(!isCarrySet()) {
			pc += value;
		}
	}

	this.ExecuteBCS = function (value) {
		if(isCarrySet()) {
			pc += value;
		}
	}

	this.ExecuteBEQ = function (value) {
		if(isZeroSet()) {
			pc += value;
		}
	}

	this.ExecuteBIT = function (addr) {
		var value = m_Memory.Get(addr);
		var tmp = p & value;
		if(tmp === 0) { setZeroFlag(); }
		(value & 64) === 0 ? unsetOverflowFlag() : setOverflowFlag();
		(value & 128) === 0 ? unsetNegativeFlag() : setNegativeFlag();
	}

	this.ExecuteBMI = function (value) {
		if(isNegativeFlagSet()) {
			pc += value;
		}
	}

	this.ExecuteBNE = function (value) {
		if(!isZeroSet()) {
			pc += value;
		}
	}

	this.ExecuteBPL = function (value) {
		if(!isNegativeFlagSet()) {
			pc += value;
		}
	}

	this.ExecuteBRK = function () {
		setBreakCommand();
		// TODO: Push values onto stack
	}

	this.ExecuteBVC = function (value) {
		if(!isOverflowFlagSet()) {
			pc += value;
		}
	}

	this.ExecuteBVS = function () {
		if(isOverflowFlagSet()) {
			pc += value;
		}
	}

	this.ExecuteCLC = function () {
		unsetCarryFlag();
	}

	this.ExecuteCLD = function () {
		unsetDecimalMode();
	}

	this.ExecuteCLI = function () {
		unsetInterruptDisable();
	}

	this.ExecuteCLV = function () {
		unsetOverflowFlag();
	}

	this.ExecuteCMP = function (addr) {
		var value = m_Memory.Get(addr);
		a = a - value;
		if(a >= value) { setCarryFlag(); }
		if(a == value) { setZeroFlag(); }
		if(a < 0) { setNegativeFlag(); }
	}

	this.ExecuteCPX = function (addr) {
		var value = m_Memory.Get(addr);
		x = x - value;
		if(x >= value) { setCarryFlag(); }
		if(x == value) { setZeroFlag();	}
		if(x < 0) { setNegativeFlag(); }
	}

	this.ExecuteCPY = function (addr) {
		var value = m_Memory.Get(addr);
		y = y - value;
		if(y >= value) { setCarryFlag(); }
		if(y == value) { setZeroFlag();	}
		if(y < 0) { setNegativeFlag(); }
	}

	this.ExecuteDEC = function (addr) {
		var value = m_Memory.Get(addr);
		value--;
		if(value === 0) { setZeroFlag(); }
		if(value < 0) { setNegativeFlag(); }
		m_Memory.Set(addr, value);
	}

	this.ExecuteDEX = function () {
		x--;
		if(x === 0) { setZeroFlag(); }
		if(x < 0) { setNegativeFlag(); }
	}

	this.ExecuteDEY = function () {
		y--;
		if(y === 0) { setZeroFlag(); }
		if(y < 0) { setNegativeFlag(); }
	}

	this.ExecuteEOR = function () {
		var value = m_Memory.Get(addr);
		a = a ^ value;
		if(a === 0) { setZeroFlag(); }
		if(a & 128) { setNegativeFlag(); }
	}

	this.ExecuteINC = function (addr) {
		var value = m_Memory.Get(addr);
		value++;
		if(value === 0) { setZeroFlag(); }
		if(value < 0) { setNegativeFlag(); }
		m_Memory.Set(addr, value);
	}

	this.ExecuteINX = function () {
		x++;
		if(x === 0) { setZeroFlag(); }
		if(x < 0) { setNegativeFlag(); }
	}

	this.ExecuteINY = function () {
		y++;
		if(y === 0) { setZeroFlag(); }
		if(y < 0) { setNegativeFlag(); }
	}

	this.ExecuteJMP = function (value) {
		pc = value;
	}

	this.ExecuteJSR = function (addr) {
		// TODO: Push PC-1 onto stack
		pc = m_Memory.Get(addr);
	}

	this.ExecuteLDA = function (addr) {
		a = m_Memory.Get(addr);
		if(a === 0) { setZeroFlag(); }
		if(a < 0) { setNegativeFlag(); }
	}

	this.ExecuteLDX = function (addr) {
		x = m_Memory.Get(addr);
		if(x === 0) { setZeroFlag(); }
		if(x < 0) { setNegativeFlag(); }
	}

	this.ExecuteLDY = function (addr) {
		y = m_Memory.Get(addr);
		if(y === 0) { setZeroFlag(); }
		if(y < 0) { setNegativeFlag(); }
	}

	this.ExecuteLSR = function () {
		// TODO:
	}

	this.ExecuteNOP = function () {
		// TODO:
	}

	this.ExecuteORA = function (addr) {
		var value = m_Memory.Get(addr);
		a = a | value;
		if(a === 0) { setZeroFlag(); }
		if(a & 128) { setNegativeFlag(); }
	}

	this.ExecutePHA = function () {
		// TODO: Push copy of Accumulator onto Stack
	}

	this.ExecutePHP = function () {
		// TODO: Push status flags onto Stack
	}

	this.ExecutePLA = function () {
		// TODO: Pull value from stack and put into A
	}

	this.ExecutePLP = function () {
		// TODO: Pull value from stack and put into Status
	}

	this.ExecuteROL = function () {
		// TODO:
	}

	this.ExecuteROR = function () {
		// TODO:
	}

	this.ExecuteRTI = function () {
		// TODO:
	}

	this.ExecuteRTS = function () {
		// TODO:
	}

	this.ExecuteSBC = function () {
		// TODO:
	}

	this.ExecuteSEC = function () {
		setCarryFlag();
	}

	this.ExecuteSED = function () {
		setDecimalMode();
	}

	this.ExecuteSEI = function () {
		setInterruptDisable();
	}

	this.ExecuteSTA = function (addr) {
		m_Memory.Set(addr, a);
	}

	this.ExecuteSTX = function () {
		m_Memory.Set(addr, x);
	}

	this.ExecuteSTY = function () {
		m_Memory.Set(addr, y);
	}

	this.ExecuteTAX = function () {
		x = a;
		if(x === 0) { setZeroFlag(); }
		if(x < 0) { setNegativeFlag(); }
	}

	this.ExecuteTAY = function () {
		y = a;
		if(y === 0) { setZeroFlag(); }
		if(y < 0) { setNegativeFlag(); }		
	}

	this.ExecuteTSX = function () {
		x = sp;
		if(x === 0) { setZeroFlag(); }
		if(x < 0) { setNegativeFlag(); }		
	}

	this.ExecuteTXA = function () {
		a = x;
		if(a === 0) { setZeroFlag(); }
		if(a < 0) { setNegativeFlag(); }		
	}

	this.ExecuteTXS = function () {
		sp = x;

	}

	this.ExecuteTYA = function () {
		a = y;
		if(a === 0) { setZeroFlag(); }
		if(a < 0) { setNegativeFlag(); }
	}

	this.ExecuteInstruction = function (opcode, addr) {
		if(opTable[opcode] == null || opTable[opcode] === undefined) {
			console.error("Unknown Instruction: " + opcode + " " + addr + " ---- Stopping Execution");
			process.stop();
		}

		opTable[opcode](addr);
	}

	this.Init = function () {
		m_Memory.Init();
		pc = 0;
		sp = 0;
		a = 0;
		x = 0;
		y = 0;
		p = 0;
	}

	this.Reset = function () {

	}

	this.Run = function () {

	}
// ----------------------------------------------------------------
};

module.exports = function (nes) {
	return new CPU(nes);
};