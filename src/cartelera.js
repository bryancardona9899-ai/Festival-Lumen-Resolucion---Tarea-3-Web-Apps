// ==========================================
// FESTIVAL LUMEN - Cartelera sin choques
// ==========================================

const proyecciones = [
    { codigo: "AUR-01", titulo: "Aurora de papel", sala: "A", inicio: 540, fin: 600 },
    { codigo: "LUM-02", titulo: "Luz de patio", sala: "A", inicio: 590, fin: 660 },
    { codigo: "RIV-03", titulo: "Río breve", sala: "A", inicio: 660, fin: 720 },
    { codigo: "NUB-04", titulo: "Nubes quietas", sala: "B", inicio: 570, fin: 615 },
    { codigo: "SOL-05", titulo: "Sol de invierno", sala: "B", inicio: 600, fin: 690 },
    { codigo: "MAR-06", titulo: "Mar interior", sala: "A", inicio: 780, fin: 840 }
  ];
  
  // 1. Validación de códigos
  function validarCodigos(lista) {
    if (!lista || lista.length === 0) {
      return { unicos: true, duplicados: [] };
    }
    const vistos = new Set();
    const duplicadosSet = new Set();
  
    for (const item of lista) {
      if (vistos.has(item.codigo)) {
        if (!duplicadosSet.has(item.codigo)) {
          duplicadosSet.add(item.codigo);
        }
      } else {
        vistos.add(item.codigo);
      }
    }
  
    const duplicados = Array.from(duplicadosSet);
    return {
      unicos: duplicados.length === 0,
      duplicados: duplicados
    };
  }
  
  // 2. Búsqueda lineal instrumentada
  function buscarProyeccionLineal(lista, codigoBuscado) {
    let comparaciones = 0;
    for (let i = 0; i < lista.length; i++) {
      comparaciones++;
      if (lista[i].codigo === codigoBuscado) {
        return { indice: i, comparaciones: comparaciones };
      }
    }
    return { indice: -1, comparaciones: comparaciones };
  }
  
  // 3. Índice por código
  function crearIndice(lista) {
    const mapa = new Map();
    for (let i = 0; i < lista.length; i++) {
      mapa.set(lista[i].codigo, i);
    }
    return mapa;
  }
  
  function buscarEnIndice(mapa, codigoBuscado) {
    if (mapa.has(codigoBuscado)) {
      return mapa.get(codigoBuscado);
    }
    return -1;
  }
  
  // 4. Detección de choques
  function detectarChoques(lista) {
    const choques = [];
    for (let i = 0; i < lista.length; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        const pA = lista[i];
        const pB = lista[j];
  
        if (pA.sala === pB.sala) {
          // Regla: inicioA < finB Y inicioB < finA
          if (pA.inicio < pB.fin && pB.inicio < pA.fin) {
            choques.push({
              codigoA: pA.codigo,
              codigoB: pB.codigo,
              sala: pA.sala
            });
          }
        }
      }
    }
    return choques;
  }
  
  // ==========================================
  // EJECUCIÓN Y PRUEBAS (C1 a C8)
  // ==========================================
  function ejecutarPruebas() {
    console.log("=== EJECUCIÓN DE CASOS DE PRUEBA (C1 - C8) ==_\n");
  
    // C1: Códigos únicos (Entrada demostración)
    const c1 = validarCodigos(proyecciones);
    console.log("C1 [Códigos únicos]:", c1);
  
    // C2: Código repetido
    const listaRepetida = [proyecciones[0], proyecciones[1], proyecciones[0]];
    const c2 = validarCodigos(listaRepetida);
    console.log("C2 [Código repetido]:", c2);
  
    // C3: Búsqueda presente
    const c3 = buscarProyeccionLineal(proyecciones, "LUM-02");
    console.log("C3 [Búsqueda presente 'LUM-02']: { indice:", c3.indice + ",", "comparaciones:", c3.comparaciones, "}");
  
    // C4: Búsqueda ausente
    const c4 = buscarProyeccionLineal(proyecciones, "ZZZ-99");
    console.log("C4 [Búsqueda ausente 'ZZZ-99']: { indice:", c4.indice + ",", "comparaciones:", c4.comparaciones, "}");
  
    // C5: Consulta con índice (Códigos: "AUR-01", "MAR-06", "ZZZ-99")
    const indiceMap = crearIndice(proyecciones);
    const codigosConsulta = ["AUR-01", "MAR-06", "ZZZ-99"];
    const resultadosLineal = codigosConsulta.map(c => buscarProyeccionLineal(proyecciones, c).indice);
    const resultadosMap = codigosConsulta.map(c => buscarEnIndice(indiceMap, c));
    console.log("C5 [Consulta con índice Map vs Lineal]:");
    console.log("  - Lineal:", resultadosLineal);
    console.log("  - Map:", resultadosMap);
    console.log("  - Entradas del Map:", Array.from(indiceMap.entries()));
  
    // C6: Choques de sala
    const c6 = detectarChoques(proyecciones);
    console.log("C6 [Choques de sala detectados]:", c6);
  
    // C7: Límite de intervalos (LUM-02 termina en 660 y RIV-03 comienza en 660 -> No hay choque)
    const choqueLlimite = c6.some(c => (c.codigoA === "LUM-02" && c.codigoB === "RIV-03") || (c.codigoA === "RIV-03" && c.codigoB === "LUM-02"));
    console.log("C7 [Límite de intervalos (660 exacto)]: ¿Existe choque entre LUM-02 y RIV-03?", choqueLlimite);
  
    // C8: Entrada sin proyecciones
    const c8Val = validarCodigos([]);
    const c8Busq = buscarProyeccionLineal([], "AUR-01");
    const c8Choq = detectarChoques([]);
    console.log("C8 [Entrada vacía]:", { unicos: c8Val.unicos, busquedas: c8Busq.indice, choques: c8Choq });
  }
  
  ejecutarPruebas();