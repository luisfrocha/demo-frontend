<script setup>
  import { ref, computed } from 'vue';
  const people = ref([
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
  ]);

  const headers = ref([
    { key: '', title: 'Pos' },
    { key: '', title: 'Club' },
    { key: '', title: 'JJ' },
    { key: '', title: 'JG' },
    { key: '', title: 'JE' },
    { key: '', title: 'JP' },
    { key: '', title: 'GF' },
    { key: '', title: 'GC' },
    { key: '', title: 'Dif' },
    { key: '', title: 'Pts' },
    { key: '', title: 'JJ' },
    { key: '', title: 'JG' },
    { key: '', title: 'JE' },
    { key: '', title: 'JP' },
    { key: '', title: 'GF' },
    { key: '', title: 'GC' },
    { key: '', title: 'Dif' },
    { key: '', title: 'Pts' },
    { key: '', title: 'JJ' },
    { key: '', title: 'JG' },
    { key: '', title: 'JE' },
    { key: '', title: 'JP' },
    { key: '', title: 'GF' },
    { key: '', title: 'GC' },
    { key: '', title: 'Dif' },
    { key: '', title: 'Pts' },
  ]);

  const table = computed(() => []);
</script>
<template>
  <table class="default tbl_grals" style="width: 100% !important">
    <thead>
      <tr>
        <th colspan="10 ">
          <ul class="symbology">
            <li><span class="colorVerde"> </span>Clasificado</li>

            <!--<li><span class="championship"></span>Libertadores</li>-->
            <!-- <li><span class="champions"></span>Campeones</li> -->
            <li><span class="colorAmarillo"></span>Reclasificado Local</li>
            <li><span class="colorAzul"></span>Reclasificado Visitante</li>

            <!--<if(parametros.actual.idTorneo != "47"){>
                    <li> <span class="all"></span>Todos</li>
                  <}>-->
          </ul>
        </th>
        <th colspan="8" class="local">Local</th>
        <th colspan="10" class="visit orange-head">Visitante</th>
      </tr>
      <tr class="head">
        <th>Pos</th>
        <th>Club</th>
        <th>JJ</th>
        <th>JG</th>
        <th>JE</th>
        <th>JP</th>
        <th>GF</th>
        <th>GC</th>
        <th>Dif</th>
        <th>PTS</th>

        <th>JJ</th>
        <th>JG</th>
        <th>JE</th>
        <th>JP</th>
        <th>GF</th>
        <th>GC</th>
        <th>Dif</th>
        <th>PTS</th>
        <th>JJ</th>
        <th>JG</th>
        <th>JE</th>
        <th>JP</th>
        <th>GF</th>
        <th>GC</th>
        <th>Dif</th>
        <th>PTS</th>
      </tr>
    </thead>
    <tbody>
      <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->

      <tr style="display: table-row">
        <td>1</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/6/cruz-azul" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/6/6.png"
              alt="Cruz Azul"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/6/cruz-azul" data-original-title="" title="">
            Cruz Azul
          </a>

          <span class="colorVerde"> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIENydXogQXp1bCIsImlkQ2x1YiI6IjYiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gQ3J1eiBBenVsIiwiaWRDbHViIjoiNiIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBDcnV6IEF6dWwiLCJpZENsdWIiOiI2IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBDcnV6IEF6dWwiLCJpZENsdWIiOiI2IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIENydXogQXp1bCIsImlkQ2x1YiI6IjYiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">3</td>

        <td class="tpts bgtpts">7</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIENydXogQXp1bCIsImlkQ2x1YiI6IjYiLCJGYXNlIjoiMSIsInNob3ciOiJKSkwifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gQ3J1eiBBenVsIiwiaWRDbHViIjoiNiIsIkZhc2UiOiIxIiwic2hvdyI6IkpHTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBDcnV6IEF6dWwiLCJpZENsdWIiOiI2IiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZMIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>0</td>

        <td class="bg-dif">3</td>
        <td class="tpts bgtpts">6</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIENydXogQXp1bCIsImlkQ2x1YiI6IjYiLCJGYXNlIjoiMSIsInNob3ciOiJKSlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBDcnV6IEF6dWwiLCJpZENsdWIiOiI2IiwiRmFzZSI6IjEiLCJzaG93IjoiSkVWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBDcnV6IEF6dWwiLCJpZENsdWIiOiI2IiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZWIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIENydXogQXp1bCIsImlkQ2x1YiI6IjYiLCJGYXNlIjoiMSIsInNob3ciOiJHQ1YifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">0</td>

        <td class="tpts bgtpts">1</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>2</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/10445/atlas" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/10445/10445.png"
              alt="Atlas"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/10445/atlas" data-original-title="" title="">
            Atlas
          </a>

          <span class="colorVerde"> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class="championship_"> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEF0bGFzIiwiaWRDbHViIjoiMTA0NDUiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gQXRsYXMiLCJpZENsdWIiOiIxMDQ0NSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBBdGxhcyIsImlkQ2x1YiI6IjEwNDQ1IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBBdGxhcyIsImlkQ2x1YiI6IjEwNDQ1IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEF0bGFzIiwiaWRDbHViIjoiMTA0NDUiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">3</td>

        <td class="tpts bgtpts">7</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEF0bGFzIiwiaWRDbHViIjoiMTA0NDUiLCJGYXNlIjoiMSIsInNob3ciOiJKSkwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gQXRsYXMiLCJpZENsdWIiOiIxMDQ0NSIsIkZhc2UiOiIxIiwic2hvdyI6IkpHTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBBdGxhcyIsImlkQ2x1YiI6IjEwNDQ1IiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td class="bg-dif">1</td>
        <td class="tpts bgtpts">3</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEF0bGFzIiwiaWRDbHViIjoiMTA0NDUiLCJGYXNlIjoiMSIsInNob3ciOiJKSlYifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gQXRsYXMiLCJpZENsdWIiOiIxMDQ0NSIsIkZhc2UiOiIxIiwic2hvdyI6IkpHViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBBdGxhcyIsImlkQ2x1YiI6IjEwNDQ1IiwiRmFzZSI6IjEiLCJzaG93IjoiSkVWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBBdGxhcyIsImlkQ2x1YiI6IjEwNDQ1IiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZWIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEF0bGFzIiwiaWRDbHViIjoiMTA0NDUiLCJGYXNlIjoiMSIsInNob3ciOiJHQ1YifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">4</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>3</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/18/pumas" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/18/18.png"
              alt="PUMAS"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/18/pumas" data-original-title="" title="">
            PUMAS
          </a>

          <span class="colorVerde"> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class="championship_"> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUFVNQVMiLCJpZENsdWIiOiIxOCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQVU1BUyIsImlkQ2x1YiI6IjE4IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >9</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">6</td>

        <td class="tpts bgtpts">6</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiJKSkwifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUFVNQVMiLCJpZENsdWIiOiIxOCIsIkZhc2UiOiIxIiwic2hvdyI6IkpHTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiJKUEwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQVU1BUyIsImlkQ2x1YiI6IjE4IiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZMIn0="
            data-original-title=""
            title=""
            >6</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiJHQ0wifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">4</td>
        <td class="tpts bgtpts">3</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiJKSlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUFVNQVMiLCJpZENsdWIiOiIxOCIsIkZhc2UiOiIxIiwic2hvdyI6IkpHViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQVU1BUyIsImlkQ2x1YiI6IjE4IiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZWIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFBVTUFTIiwiaWRDbHViIjoiMTgiLCJGYXNlIjoiMSIsInNob3ciOiJHQ1YifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>4</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/11/pachuca" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/11/11.png"
              alt="Pachuca"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/11/pachuca" data-original-title="" title="">
            Pachuca
          </a>

          <span class="colorVerde"> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUGFjaHVjYSIsImlkQ2x1YiI6IjExIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQYWNodWNhIiwiaWRDbHViIjoiMTEiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">6</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IkpKTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUGFjaHVjYSIsImlkQ2x1YiI6IjExIiwiRmFzZSI6IjEiLCJzaG93IjoiSkdMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQYWNodWNhIiwiaWRDbHViIjoiMTEiLCJGYXNlIjoiMSIsInNob3ciOiJHRkwifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IkdDTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">1</td>
        <td class="tpts bgtpts">3</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IkpKViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUGFjaHVjYSIsImlkQ2x1YiI6IjExIiwiRmFzZSI6IjEiLCJzaG93IjoiSkdWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IkpQViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQYWNodWNhIiwiaWRDbHViIjoiMTEiLCJGYXNlIjoiMSIsInNob3ciOiJHRlYifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFBhY2h1Y2EiLCJpZENsdWIiOiIxMSIsIkZhc2UiOiIxIiwic2hvdyI6IkdDViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">1</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>5</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/11790/fc-juarez" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/11790/11790.png"
              alt="FC Juárez"
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/11790/fc-juarez"
            data-original-title=""
            title=""
          >
            FC Juárez
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class="colorAmarillo"> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gRkMgSnXhcmV6IiwiaWRDbHViIjoiMTE3OTAiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBGQyBKdeFyZXoiLCJpZENsdWIiOiIxMTc5MCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">1</td>

        <td class="tpts bgtpts">6</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gRkMgSnXhcmV6IiwiaWRDbHViIjoiMTE3OTAiLCJGYXNlIjoiMSIsInNob3ciOiJKR0wifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBGQyBKdeFyZXoiLCJpZENsdWIiOiIxMTc5MCIsIkZhc2UiOiIxIiwic2hvdyI6IkdGTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">1</td>
        <td class="tpts bgtpts">3</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gRkMgSnXhcmV6IiwiaWRDbHViIjoiMTE3OTAiLCJGYXNlIjoiMSIsInNob3ciOiJKR1YifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiSlBWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBGQyBKdeFyZXoiLCJpZENsdWIiOiIxMTc5MCIsIkZhc2UiOiIxIiwic2hvdyI6IkdGViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEZDIEp14XJleiIsImlkQ2x1YiI6IjExNzkwIiwiRmFzZSI6IjEiLCJzaG93IjoiR0NWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">0</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>6</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/17/toluca" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/17/17.png"
              alt="Toluca"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/17/toluca" data-original-title="" title="">
            Toluca
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class="colorAmarillo"> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gVG9sdWNhIiwiaWRDbHViIjoiMTciLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBUb2x1Y2EiLCJpZENsdWIiOiIxNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >7</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">6</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gVG9sdWNhIiwiaWRDbHViIjoiMTciLCJGYXNlIjoiMSIsInNob3ciOiJKR0wifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBUb2x1Y2EiLCJpZENsdWIiOiIxNyIsIkZhc2UiOiIxIiwic2hvdyI6IkdGTCJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">2</td>
        <td class="tpts bgtpts">3</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gVG9sdWNhIiwiaWRDbHViIjoiMTciLCJGYXNlIjoiMSIsInNob3ciOiJKR1YifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiSlBWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBUb2x1Y2EiLCJpZENsdWIiOiIxNyIsIkZhc2UiOiIxIiwic2hvdyI6IkdGViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFRvbHVjYSIsImlkQ2x1YiI6IjE3IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NWIn0="
            data-original-title=""
            title=""
            >6</a
          >
        </td>

        <td class="bg-dif">-4</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>7</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/14/monterrey" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/14/14.png"
              alt="Monterrey"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/14/monterrey" data-original-title="" title="">
            Monterrey
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class="colorAmarillo"> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE1vbnRlcnJleSIsImlkQ2x1YiI6IjE0IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gTW9udGVycmV5IiwiaWRDbHViIjoiMTQiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBNb250ZXJyZXkiLCJpZENsdWIiOiIxNCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBNb250ZXJyZXkiLCJpZENsdWIiOiIxNCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >6</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE1vbnRlcnJleSIsImlkQ2x1YiI6IjE0IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">4</td>

        <td class="tpts bgtpts">5</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE1vbnRlcnJleSIsImlkQ2x1YiI6IjE0IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBNb250ZXJyZXkiLCJpZENsdWIiOiIxNCIsIkZhc2UiOiIxIiwic2hvdyI6IkpFTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBNb250ZXJyZXkiLCJpZENsdWIiOiIxNCIsIkZhc2UiOiIxIiwic2hvdyI6IkdGTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE1vbnRlcnJleSIsImlkQ2x1YiI6IjE0IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">0</td>
        <td class="tpts bgtpts">2</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE1vbnRlcnJleSIsImlkQ2x1YiI6IjE0IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gTW9udGVycmV5IiwiaWRDbHViIjoiMTQiLCJGYXNlIjoiMSIsInNob3ciOiJKR1YifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBNb250ZXJyZXkiLCJpZENsdWIiOiIxNCIsIkZhc2UiOiIxIiwic2hvdyI6IkdGViJ9"
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td>0</td>

        <td class="bg-dif">4</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>8</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/9/leon" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/9/9.png"
              alt="León"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/9/leon" data-original-title="" title="">
            León
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class="colorAmarillo"> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIExl824iLCJpZENsdWIiOiI5IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gTGXzbiIsImlkQ2x1YiI6IjkiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBMZfNuIiwiaWRDbHViIjoiOSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBMZfNuIiwiaWRDbHViIjoiOSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIExl824iLCJpZENsdWIiOiI5IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">1</td>

        <td class="tpts bgtpts">5</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIExl824iLCJpZENsdWIiOiI5IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gTGXzbiIsImlkQ2x1YiI6IjkiLCJGYXNlIjoiMSIsInNob3ciOiJKR0wifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBMZfNuIiwiaWRDbHViIjoiOSIsIkZhc2UiOiIxIiwic2hvdyI6IkpFTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBMZfNuIiwiaWRDbHViIjoiOSIsIkZhc2UiOiIxIiwic2hvdyI6IkdGTCJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIExl824iLCJpZENsdWIiOiI5IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">1</td>
        <td class="tpts bgtpts">4</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIExl824iLCJpZENsdWIiOiI5IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBMZfNuIiwiaWRDbHViIjoiOSIsIkZhc2UiOiIxIiwic2hvdyI6IkpFViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBMZfNuIiwiaWRDbHViIjoiOSIsIkZhc2UiOiIxIiwic2hvdyI6IkdGViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIExl824iLCJpZENsdWIiOiI5IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">0</td>

        <td class="tpts bgtpts">1</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>9</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/7/guadalajara" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/7/7.png"
              alt="Guadalajara"
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/7/guadalajara"
            data-original-title=""
            title=""
          >
            Guadalajara
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class="colorAzul"> </span>

          <span class="championship_"> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gR3VhZGFsYWphcmEiLCJpZENsdWIiOiI3IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBHdWFkYWxhamFyYSIsImlkQ2x1YiI6IjciLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBHdWFkYWxhamFyYSIsImlkQ2x1YiI6IjciLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">4</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IkpKTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gR3VhZGFsYWphcmEiLCJpZENsdWIiOiI3IiwiRmFzZSI6IjEiLCJzaG93IjoiSkdMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBHdWFkYWxhamFyYSIsImlkQ2x1YiI6IjciLCJGYXNlIjoiMSIsInNob3ciOiJKRUwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBHdWFkYWxhamFyYSIsImlkQ2x1YiI6IjciLCJGYXNlIjoiMSIsInNob3ciOiJHRkwifQ=="
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IkdDTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">3</td>
        <td class="tpts bgtpts">4</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IkpKViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IkpQViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBHdWFkYWxhamFyYSIsImlkQ2x1YiI6IjciLCJGYXNlIjoiMSIsInNob3ciOiJHRlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEd1YWRhbGFqYXJhIiwiaWRDbHViIjoiNyIsIkZhc2UiOiIxIiwic2hvdyI6IkdDViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">-1</td>

        <td class="tpts bgtpts">0</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>10</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/11550/puebla-fc" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/11550/11550.png"
              alt="Puebla F.C."
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/11550/puebla-fc"
            data-original-title=""
            title=""
          >
            Puebla F.C.
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class="colorAzul"> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFB1ZWJsYSBGLkMuIiwiaWRDbHViIjoiMTE1NTAiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUHVlYmxhIEYuQy4iLCJpZENsdWIiOiIxMTU1MCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBQdWVibGEgRi5DLiIsImlkQ2x1YiI6IjExNTUwIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQdWVibGEgRi5DLiIsImlkQ2x1YiI6IjExNTUwIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFB1ZWJsYSBGLkMuIiwiaWRDbHViIjoiMTE1NTAiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">4</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFB1ZWJsYSBGLkMuIiwiaWRDbHViIjoiMTE1NTAiLCJGYXNlIjoiMSIsInNob3ciOiJKSkwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBQdWVibGEgRi5DLiIsImlkQ2x1YiI6IjExNTUwIiwiRmFzZSI6IjEiLCJzaG93IjoiSkVMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQdWVibGEgRi5DLiIsImlkQ2x1YiI6IjExNTUwIiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFB1ZWJsYSBGLkMuIiwiaWRDbHViIjoiMTE1NTAiLCJGYXNlIjoiMSIsInNob3ciOiJHQ0wifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">0</td>
        <td class="tpts bgtpts">1</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFB1ZWJsYSBGLkMuIiwiaWRDbHViIjoiMTE1NTAiLCJGYXNlIjoiMSIsInNob3ciOiJKSlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gUHVlYmxhIEYuQy4iLCJpZENsdWIiOiIxMTU1MCIsIkZhc2UiOiIxIiwic2hvdyI6IkpHViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBQdWVibGEgRi5DLiIsImlkQ2x1YiI6IjExNTUwIiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZWIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>11</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/16/uanl" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/16/16.png"
              alt="UANL"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/16/uanl" data-original-title="" title="">
            UANL
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class="colorAzul"> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gVUFOTCIsImlkQ2x1YiI6IjE2IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBVQU5MIiwiaWRDbHViIjoiMTYiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBVQU5MIiwiaWRDbHViIjoiMTYiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td class="bg-dif">-1</td>

        <td class="tpts bgtpts">4</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IkpKTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IkpQTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IkdDTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">-2</td>
        <td class="tpts bgtpts">0</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IkpKViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gVUFOTCIsImlkQ2x1YiI6IjE2IiwiRmFzZSI6IjEiLCJzaG93IjoiSkdWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBVQU5MIiwiaWRDbHViIjoiMTYiLCJGYXNlIjoiMSIsInNob3ciOiJKRVYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBVQU5MIiwiaWRDbHViIjoiMTYiLCJGYXNlIjoiMSIsInNob3ciOiJHRlYifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFVBTkwiLCJpZENsdWIiOiIxNiIsIkZhc2UiOiIxIiwic2hvdyI6IkdDViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">1</td>

        <td class="tpts bgtpts">4</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: table-row">
        <td>12</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/29/necaxa" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/29/29.png"
              alt="Necaxa"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/29/necaxa" data-original-title="" title="">
            Necaxa
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class="colorAzul"> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gTmVjYXhhIiwiaWRDbHViIjoiMjkiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBOZWNheGEiLCJpZENsdWIiOiIyOSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >7</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">3</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiSlBMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td class="bg-dif">-4</td>
        <td class="tpts bgtpts">0</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow ganados"
            href="estadistica/jg/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBHYW5hZG9zIC0gTmVjYXhhIiwiaWRDbHViIjoiMjkiLCJGYXNlIjoiMSIsInNob3ciOiJKR1YifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiSlBWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBOZWNheGEiLCJpZENsdWIiOiIyOSIsIkZhc2UiOiIxIiwic2hvdyI6IkdGViJ9"
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE5lY2F4YSIsImlkQ2x1YiI6IjI5IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NWIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">2</td>

        <td class="tpts bgtpts">3</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: ">
        <td>13</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a
            class="loadershow col-xs-3"
            href="cancha/club/12037/gallos-blancos-de-queretaro"
            data-original-title=""
            title=""
          >
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/12037/12037.png"
              alt="Gallos Blancos de Querétaro "
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/12037/gallos-blancos-de-queretaro"
            data-original-title=""
            title=""
          >
            Gallos Blancos de Querétaro
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBHYWxsb3MgQmxhbmNvcyBkZSBRdWVy6XRhcm8gIiwiaWRDbHViIjoiMTIwMzciLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBHYWxsb3MgQmxhbmNvcyBkZSBRdWVy6XRhcm8gIiwiaWRDbHViIjoiMTIwMzciLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">2</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IkpKTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IkpQTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBHYWxsb3MgQmxhbmNvcyBkZSBRdWVy6XRhcm8gIiwiaWRDbHViIjoiMTIwMzciLCJGYXNlIjoiMSIsInNob3ciOiJHRkwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IkdDTCJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">-2</td>
        <td class="tpts bgtpts">0</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IkpKViJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBHYWxsb3MgQmxhbmNvcyBkZSBRdWVy6XRhcm8gIiwiaWRDbHViIjoiMTIwMzciLCJGYXNlIjoiMSIsInNob3ciOiJKRVYifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBHYWxsb3MgQmxhbmNvcyBkZSBRdWVy6XRhcm8gIiwiaWRDbHViIjoiMTIwMzciLCJGYXNlIjoiMSIsInNob3ciOiJHRlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEdhbGxvcyBCbGFuY29zIGRlIFF1ZXLpdGFybyAiLCJpZENsdWIiOiIxMjAzNyIsIkZhc2UiOiIxIiwic2hvdyI6IkdDViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">0</td>

        <td class="tpts bgtpts">2</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: ">
        <td>14</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/1/america" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/1/1.png"
              alt="América"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/1/america" data-original-title="" title="">
            América
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBBbelyaWNhIiwiaWRDbHViIjoiMSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBBbelyaWNhIiwiaWRDbHViIjoiMSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">1</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiSlBMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">-2</td>
        <td class="tpts bgtpts">0</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBBbelyaWNhIiwiaWRDbHViIjoiMSIsIkZhc2UiOiIxIiwic2hvdyI6IkpFViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBBbelyaWNhIiwiaWRDbHViIjoiMSIsIkZhc2UiOiIxIiwic2hvdyI6IkdGViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIEFt6XJpY2EiLCJpZENsdWIiOiIxIiwiRmFzZSI6IjEiLCJzaG93IjoiR0NWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">0</td>

        <td class="tpts bgtpts">1</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: ">
        <td>15</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/5/tijuana" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/5/5.png"
              alt="Tijuana"
            />
          </a>

          <a class="tpts loadershow col-xs-9 hidden-xs" href="cancha/club/5/tijuana" data-original-title="" title="">
            Tijuana
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBUaWp1YW5hIiwiaWRDbHViIjoiNSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBUaWp1YW5hIiwiaWRDbHViIjoiNSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">1</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBUaWp1YW5hIiwiaWRDbHViIjoiNSIsIkZhc2UiOiIxIiwic2hvdyI6IkpFTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBUaWp1YW5hIiwiaWRDbHViIjoiNSIsIkZhc2UiOiIxIiwic2hvdyI6IkdGTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">0</td>
        <td class="tpts bgtpts">1</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiSkpWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiSlBWIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFRpanVhbmEiLCJpZENsdWIiOiI1IiwiRmFzZSI6IjEiLCJzaG93IjoiR0NWIn0="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">0</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: ">
        <td>16</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/15/santos-laguna" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/15/15.png"
              alt="Santos Laguna"
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/15/santos-laguna"
            data-original-title=""
            title=""
          >
            Santos Laguna
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBTYW50b3MgTGFndW5hIiwiaWRDbHViIjoiMTUiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBTYW50b3MgTGFndW5hIiwiaWRDbHViIjoiMTUiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >8</a
          >
        </td>

        <td class="bg-dif">-5</td>

        <td class="tpts bgtpts">1</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IkpKTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow empatados"
            href="estadistica/je/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBFbXBhdGFkb3MgLSBTYW50b3MgTGFndW5hIiwiaWRDbHViIjoiMTUiLCJGYXNlIjoiMSIsInNob3ciOiJKRUwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IkpQTCJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBTYW50b3MgTGFndW5hIiwiaWRDbHViIjoiMTUiLCJGYXNlIjoiMSIsInNob3ciOiJHRkwifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IkdDTCJ9"
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td class="bg-dif">-3</td>
        <td class="tpts bgtpts">1</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IkpKViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IkpQViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBTYW50b3MgTGFndW5hIiwiaWRDbHViIjoiMTUiLCJGYXNlIjoiMSIsInNob3ciOiJHRlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIFNhbnRvcyBMYWd1bmEiLCJpZENsdWIiOiIxNSIsIkZhc2UiOiIxIiwic2hvdyI6IkdDViJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">-2</td>

        <td class="tpts bgtpts">0</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: ">
        <td>17</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a class="loadershow col-xs-3" href="cancha/club/12043/mazatlan-fc" data-original-title="" title="">
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/12043/12043.png"
              alt="Mazatlán FC"
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/12043/mazatlan-fc"
            data-original-title=""
            title=""
          >
            Mazatlán FC
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBNYXphdGzhbiBGQyIsImlkQ2x1YiI6IjEyMDQzIiwiRmFzZSI6IjEiLCJzaG93IjoiIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiIifQ=="
            data-original-title=""
            title=""
            >5</a
          >
        </td>

        <td class="bg-dif">-4</td>

        <td class="tpts bgtpts">0</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiJKSkwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiJKUEwifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gf/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGEgRmF2b3IgLSBNYXphdGzhbiBGQyIsImlkQ2x1YiI6IjEyMDQzIiwiRmFzZSI6IjEiLCJzaG93IjoiR0ZMIn0="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiJHQ0wifQ=="
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td class="bg-dif">-1</td>
        <td class="tpts bgtpts">0</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiJKSlYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiJKUFYifQ=="
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIE1hemF0bOFuIEZDIiwiaWRDbHViIjoiMTIwNDMiLCJGYXNlIjoiMSIsInNob3ciOiJHQ1YifQ=="
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">-3</td>

        <td class="tpts bgtpts">0</td>

        <!--Obtener Los dos mejores Clubes ubicados, eliminando a los Clubes de Liga de Campeones-->
      </tr>
      <tr style="display: ">
        <td>18</td>
        <td class="tablenameClub col-xs-12" style="text-align: left !important">
          <a
            class="loadershow col-xs-3"
            href="cancha/club/11220/club-atletico-de-san-luis"
            data-original-title=""
            title=""
          >
            <img
              class="thaClub"
              src="https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos35x35/11220/11220.png"
              alt="Club Atlético de San Luis"
            />
          </a>

          <a
            class="tpts loadershow col-xs-9 hidden-xs"
            href="cancha/club/11220/club-atletico-de-san-luis"
            data-original-title=""
            title=""
          >
            Club Atlético de San Luis
          </a>

          <span class=" "> </span>

          <!--
              <span class="< %if(typeof clubesConcaChampions[club.idClub] != "undefined" && (parametros.actual.idDivision == "111" && (parametros.actual.idTorneo == "1" || parametros.actual.idTorneo == "2") )&& (parametros.actual.idTorneo!='5' || parametros.actual.idTorneo!='6')){ % >
                champions
              < % } % > ">
              </span>
              -->

          <!-- LIGA MX -->
          <span class=" "> </span>
          <!-- LIGA MX -->
          <span class=" "> </span>

          <span class=" "> </span>
        </td>

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IiJ9"
            data-original-title=""
            title=""
            >4</a
          >
        </td>

        <td class="bg-dif">-4</td>

        <td class="tpts bgtpts">0</td>

        <!-- Local -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IkpKTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IkpQTCJ9"
            data-original-title=""
            title=""
            >2</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IkdDTCJ9"
            data-original-title=""
            title=""
            >3</a
          >
        </td>

        <td class="bg-dif">-3</td>
        <td class="tpts bgtpts">0</td>
        <!-- Visita -->

        <td>
          <a
            class="loadershow"
            href="estadistica/tj/eyJ0aXR1bG9UYWJsYSI6IlRvdGFsIGRlIEp1ZWdvcyAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IkpKViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>0</td>

        <td>
          <a
            class="loadershow perdidos"
            href="estadistica/jp/eyJ0aXR1bG9UYWJsYSI6Ikp1ZWdvcyBQZXJkaWRvcyAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IkpQViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td>0</td>

        <td>
          <a
            class="loadershow"
            href="estadistica/gc/eyJ0aXR1bG9UYWJsYSI6IkdvbGVzIGVuIENvbnRyYSAtIENsdWIgQXRs6XRpY28gZGUgU2FuIEx1aXMiLCJpZENsdWIiOiIxMTIyMCIsIkZhc2UiOiIxIiwic2hvdyI6IkdDViJ9"
            data-original-title=""
            title=""
            >1</a
          >
        </td>

        <td class="bg-dif">-1</td>

        <td class="tpts bgtpts">0</td>
      </tr>
    </tbody>
  </table>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th colspan="10">
                  <div class="mb-3 mt-2">
                    <div class="relative">
                      <div class="relative mx-auto px-2">
                        <div class="max-w-4xl mx-auto">
                          <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3 max-h-10">
                            <div
                              class="flex flex-row border-b border-gray-100 p-1 justify-center sm:border-0 sm:border-r"
                            >
                              <dt class="order-2 text-md leading-1 font-medium text-gray-500">Clasificado</dt>
                              <dd class="order-1 text-4xl font-extrabold text-green-500">&bullet;</dd>
                            </div>
                            <div
                              class="flex flex-row border-t border-b border-gray-100 p-2 justify-center sm:border-0 sm:border-l sm:border-r"
                            >
                              <dt class="order-2 text-md leading-1 font-medium text-gray-500">Reclasificado Local</dt>
                              <dd class="order-1 text-4xl font-extrabold text-red-500">&bullet;</dd>
                            </div>
                            <div
                              class="flex flex-row border-t border-gray-100 p-2 justify-center sm:border-0 sm:border-l align-center"
                            >
                              <dt class="order-2 text-md leading-1 font-medium text-gray-500">
                                Reclasificado Visitante
                              </dt>
                              <dd class="order-1 text-4xl font-extrabold text-blue-600">&bullet;</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <th colspan="8" class="local">Local</th>
                <th colspan="10" class="visit orange-head">Visitante</th>
              </tr>
              <tr>
                <th
                  v-for="column in headers"
                  :key="column.title"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ column.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(person, personIdx) in people"
                :key="person.email"
                :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ person.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ person.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ person.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ person.role }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
