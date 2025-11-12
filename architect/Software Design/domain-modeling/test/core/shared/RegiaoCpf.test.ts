import RegiaoCpf from "@/core/shared/RegiaoCpf";

test("Deve criar uma RegiaoCpf of the region 0", () => {
	const regiaoA = RegiaoCpf.porCodigo(0);

	expect(regiaoA.estados[0]).toBe("RS");
});

test("Deve criar uma RegiaoCpf por cpf", () => {
	const regiao = RegiaoCpf.porCpf("345.799.510-93");
	expect(regiao.codigo).toBe(0);
	expect(regiao.estados[0]).toBe("RS");
});

test("Deve comparar regiões como iguais", () => {
	const regiaoA = RegiaoCpf.porCpf("671.443.697-17");
	const regiaoB = RegiaoCpf.porCpf("054.319.017-02");
	expect(regiaoA.igual(regiaoB)).toBe(true);
	expect(regiaoA.diferente(regiaoB)).toBe(false);
	expect(regiaoA === regiaoB).toBe(true);
});

test("Deve comparar regiões como diferentes", () => {
	const regiaoA = RegiaoCpf.porCpf("392.021.724-12");
	const regiaoB = RegiaoCpf.porCpf("878.934.002-77");
	expect(regiaoA.igual(regiaoB)).toBe(false);
	expect(regiaoA.diferente(regiaoB)).toBe(true);
});

test("Deve comparar uma região com undefined", () => {
	const regiao = RegiaoCpf.porCpf("392.021.724-12");
	expect(regiao.igual(undefined as any)).toBe(false);
	expect(regiao.diferente(undefined as any)).toBe(true);
});

test("Deve criar uma RegiaoCpf de SP", () => {
	const regiao = RegiaoCpf.SP;
	expect(regiao.codigo).toBe(8);
	expect(regiao.estados[0]).toBe("SP");
});

test("Deve criar uma RegiaoCpf de CE_MA_PI", () => {
	const regiao = RegiaoCpf.CE_MA_PI;
	expect(regiao.codigo).toBe(3);
	expect(regiao.estados[0]).toBe("CE");
	expect(regiao.estados[1]).toBe("MA");
	expect(regiao.estados[2]).toBe("PI");
});
