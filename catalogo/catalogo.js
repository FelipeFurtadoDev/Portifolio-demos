/* =====================================================================
   Montagem do catálogo a partir de catalogo/modelos.js
   Não é preciso editar este arquivo para cadastrar modelos.

   Funcionamento:
   - lê window.CATALOGO_MODELOS, valida cada modelo e ordena por "ordem";
   - preenche os modelos (template #tpl-modelo) e o índice (#tpl-indice);
   - um modelo com dados incompletos é ignorado, com aviso no console,
     sem derrubar os demais;
   - se nada puder ser montado, a lista de reserva escrita no index.html
     continua na tela, com links diretos para as demonstrações.
   ===================================================================== */
(function () {
  "use strict";

  var ID_VALIDO = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var COR_VALIDA = /^#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?$/;

  function texto(valor) {
    return typeof valor === "string" && valor.trim() !== "";
  }

  // Devolve a lista de problemas do modelo; lista vazia = modelo válido.
  function problemas(m) {
    var erros = [];
    if (!m || typeof m !== "object") return ["não é um objeto"];
    if (!texto(m.id) || !ID_VALIDO.test(m.id)) erros.push("id ausente ou inválido");
    if (typeof m.ordem !== "number" || !isFinite(m.ordem)) erros.push("ordem deve ser um número");
    ["marca", "nicho", "descricao", "demo"].forEach(function (campo) {
      if (!texto(m[campo])) erros.push(campo + " ausente");
    });
    if (texto(m.demo) && (/^[a-z]+:/i.test(m.demo) || m.demo.charAt(0) === "/")) {
      erros.push("demo deve ser um caminho relativo, como ./Pasta/");
    }
    if (!Array.isArray(m.caracteristicas) || !m.caracteristicas.length || !m.caracteristicas.every(texto)) {
      erros.push("caracteristicas deve ser uma lista de textos");
    }
    var c = m.cores || {};
    ["palco", "tinta", "tintaSuave"].forEach(function (campo) {
      if (!COR_VALIDA.test(c[campo] || "")) erros.push("cores." + campo + " deve ser uma cor como #682F49");
    });
    var i = m.imagens || {};
    ["desktop", "desktopLeve", "celular"].forEach(function (campo) {
      if (!texto(i[campo])) erros.push("imagens." + campo + " ausente");
    });
    return erros;
  }

  function prepararModelos(lista) {
    var vistos = {};
    return lista
      .filter(function (m, posicao) {
        var erros = problemas(m);
        if (!erros.length && vistos[m.id]) erros.push('id "' + m.id + '" repetido');
        if (erros.length) {
          console.warn("[catálogo] Modelo " + (posicao + 1) + " ignorado: " + erros.join("; ") + ".", m);
          return false;
        }
        vistos[m.id] = true;
        return true;
      })
      .slice()
      .sort(function (a, b) {
        return a.ordem - b.ordem || a.marca.localeCompare(b.marca, "pt-BR");
      });
  }

  function campo(raiz, nome) {
    return raiz.querySelector('[data-campo="' + nome + '"]');
  }

  // "./Forma-Doce/" -> "Forma-Doce/" (texto da barra da tela de computador)
  function caminhoVisivel(demo) {
    return demo.replace(/^\.\//, "");
  }

  function montarModelo(tpl, m, posicao) {
    var artigo = tpl.content.firstElementChild.cloneNode(true);
    var idNome = m.id + "-nome";
    var numero = String(posicao + 1).padStart(2, "0");

    artigo.id = "modelo-" + m.id;
    artigo.setAttribute("aria-labelledby", idNome);
    artigo.style.setProperty("--palco", m.cores.palco);
    artigo.style.setProperty("--tinta", m.cores.tinta);
    artigo.style.setProperty("--tinta-suave", m.cores.tintaSuave);

    campo(artigo, "numero").textContent = "Modelo " + numero;
    var nome = campo(artigo, "marca");
    nome.id = idNome;
    nome.textContent = m.marca;
    campo(artigo, "nicho").textContent = m.nicho;
    campo(artigo, "descricao").textContent = m.descricao;

    var lista = campo(artigo, "caracteristicas");
    m.caracteristicas.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      lista.appendChild(li);
    });

    var acao = campo(artigo, "acao");
    acao.href = m.demo;
    campo(artigo, "acao-complemento").textContent = " do modelo " + m.marca;

    campo(artigo, "previa").href = m.demo;
    campo(artigo, "caminho").textContent = caminhoVisivel(m.demo);

    var desktop = campo(artigo, "img-desktop");
    desktop.srcset = m.imagens.desktopLeve + " 800w, " + m.imagens.desktop + " 1600w";
    desktop.src = m.imagens.desktopLeve;
    if (posicao === 0) {
      // A primeira prévia aparece logo na abertura: carrega sem espera.
      desktop.removeAttribute("loading");
      desktop.setAttribute("fetchpriority", "high");
    }
    campo(artigo, "img-celular").src = m.imagens.celular;

    return artigo;
  }

  function montarItemIndice(tpl, m) {
    var li = tpl.content.firstElementChild.cloneNode(true);
    var link = li.querySelector("a");
    link.href = "#modelo-" + m.id;
    campo(li, "marca").textContent = m.marca;
    campo(li, "nicho").textContent = m.nicho;
    return li;
  }

  function iniciar() {
    var principal = document.getElementById("modelos");
    var indice = document.getElementById("indice-lista");
    var tplModelo = document.getElementById("tpl-modelo");
    var tplIndice = document.getElementById("tpl-indice");
    var reserva = document.getElementById("aviso-reserva");

    try {
      if (!principal || !indice || !tplModelo || !tplIndice || !("content" in tplModelo)) {
        throw new Error("estrutura do index.html incompleta");
      }
      if (!Array.isArray(window.CATALOGO_MODELOS)) {
        throw new Error("catalogo/modelos.js não carregou ou não define CATALOGO_MODELOS");
      }

      var modelos = prepararModelos(window.CATALOGO_MODELOS);
      if (!modelos.length) throw new Error("nenhum modelo válido no cadastro");

      // Monta tudo fora da página e só troca no fim: se algo falhar no meio,
      // a lista de reserva continua intacta.
      var blocos = document.createDocumentFragment();
      var itens = document.createDocumentFragment();
      modelos.forEach(function (m, posicao) {
        blocos.appendChild(montarModelo(tplModelo, m, posicao));
        itens.appendChild(montarItemIndice(tplIndice, m));
      });

      indice.replaceChildren(itens);
      principal.appendChild(blocos);
      if (reserva) reserva.remove();
      document.documentElement.classList.add("catalogo-montado");

      // Quem chega por um link como index.html#modelo-traco vai ao modelo certo,
      // já que ele só existe depois da montagem.
      if (location.hash) {
        var alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        // "instant": salto direto, como faria o próprio navegador ao abrir o link.
        if (alvo) alvo.scrollIntoView({ behavior: "instant", block: "start" });
      }
    } catch (erro) {
      console.error("[catálogo] As prévias não foram montadas: " + erro.message + ". Exibindo a lista de reserva.");
      if (reserva) reserva.hidden = false;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
