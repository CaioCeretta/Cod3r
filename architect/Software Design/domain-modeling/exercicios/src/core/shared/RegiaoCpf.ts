export default class RegiaoCpf {
	static readonly TODAS = [
		new RegiaoCpf(0, ["RS"]),
		new RegiaoCpf(1, ["DF", "GO", "MS", "MT", "TO"]),
		new RegiaoCpf(2, ["AC", "AM", "AP", "PA", "RO", "RR"]),
		new RegiaoCpf(3, ["CE", "MA", "PI"]),
		new RegiaoCpf(4, ["AL", "PB", "PE", "RN"]),
		new RegiaoCpf(5, ["BA", "SE"]),
		new RegiaoCpf(6, ["MG"]),
		new RegiaoCpf(7, ["ES", "RJ"]),
		new RegiaoCpf(8, ["SP"]),
		new RegiaoCpf(9, ["PR", "SC"]),
	];

	private constructor(
		readonly codigo: number,
		readonly estados: string[],
	) {}

	static readonly RS = RegiaoCpf.TODAS[0];
	static readonly DF_GO_MS_MT_TO = RegiaoCpf.TODAS[1];
	static readonly AC_AM_AP_PA_RO_RR = RegiaoCpf.TODAS[2];
	static readonly CE_MA_PI = RegiaoCpf.TODAS[3];
	static readonly AL_PB_PE_RN = RegiaoCpf.TODAS[4];
	static readonly BA_SE = RegiaoCpf.TODAS[5];
	static readonly MG = RegiaoCpf.TODAS[6];
	static readonly ES_RJ = RegiaoCpf.TODAS[7];
	static readonly SP = RegiaoCpf.TODAS[8];
	static readonly PR_SC = RegiaoCpf.TODAS[9];

	static porCodigo(codigo: number): RegiaoCpf {
		return RegiaoCpf.TODAS[codigo];
	}

	static porCpf(cpf: string): RegiaoCpf {
		const codigo = +cpf.replace(/\D/g, "")[8];
		return RegiaoCpf.TODAS[codigo];
	}

	igual(outraRegiao: RegiaoCpf): boolean {
		return this.codigo === outraRegiao?.codigo;
	}

	diferente(outraRegiao: RegiaoCpf): boolean {
		return this.codigo !== outraRegiao?.codigo;
	}
}
