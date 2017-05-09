import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, SimulationNodeDatum, SimulationLinkDatum, ForceLink } from 'd3-ng2-service';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { legendColor } from 'd3-svg-legend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private d3: D3;
  dataset: any;

  constructor(
    d3Service: D3Service,
    private titleService: Title,
    private data: DataService
  ) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    // title the page
    this.titleService.setTitle('Force Directed - FCC');

    this.data.getJson().subscribe(
      data => {
        if (data) {
          this.dataset = data;
          // console.log(data);
          this.drawForceDirected();
        }
      }
    );

  }

  drawForceDirected() {
    // alias d3
    const d3 = this.d3;

    // setup svg component
    const width = 1000,
          height = 750,
          padding = 50;

    // append svg component
    const svg = d3.select("#svg")
      .append("svg")
      .attr("class", "svg")
      .attr("width", width)
      .attr("height", height);

    // separate data
    const links = this.dataset['links'];
    const nodes = this.dataset['nodes'];

    // add id field to nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].id = i;
    }

    console.log('nodes:', nodes);

    // setup simulation
    let simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d['id']))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // restoring force acting towards the center
    simulation
      .force('xAxis', d3.forceX().strength(.05).x(width / 2))
      .force('yAxis', d3.forceY().strength(.05).y(height / 2));

    // changing from css positioning to js positioning per Mark's answer on stackoverflow
    // http://stackoverflow.com/questions/39128245/adding-foreignobjects-to-d3-force-directed-graph-nodes-breaks-events/39129790#39129790
    // sprite image positions
    const imagePos = [
      { name: 'jp', x: -16, y: -70 },
      { name: 'cm', x: -192, y: -20 },
      { name: 'mq', x: -80, y: -90 },
      { name: 'ls', x: -48, y: -80 },
      { name: 'il', x: -64, y: -60 },
      { name: 'kh', x: -64, y: -70 },
      { name: 'kz', x: -192, y: -70 },
      { name: 'mm', x: -16, y: -90 },
      { name: 'sy', x: -48, y: -130 },
      { name: 'cg', x: -112, y: -20 },
      { name: 'mk', x: -240, y: -80 },
      { name: 'ua', x: -80, y: -140 },
      { name: 'tv', x: -32, y: -140 },
      { name: 'mv', x: -160, y: -90 },
      { name: 'dk', x: -112, y: -30 },
      { name: 'gm', x: -32, y: -50 },
      { name: 'gl', x: -16, y: -50 },
      { name: 'gq', x: -80, y: -50 },
      { name: 'ai', x: -64, y: 0 },
      { name: 'li', x: 0, y: -80 },
      { name: 'in', x: -112, y: -60 },
      { name: 'nc', x: 0, y: -100 },
      { name: 'nf', x: -32, y: -100 },
      { name: 'ie', x: -48, y: -60 },
      { name: 'id', x: -32, y: -60 },
      { name: 'gh', x: -240, y: -40 },
      { name: 'et', x: -16, y: -40 },
      { name: 'sv', x: -16, y: -130 },
      { name: 'af', x: -32, y: 0 },
      { name: 'ni', x: -64, y: -100 },
      { name: 'gd', x: -160, y: -40 },
      { name: 'hm', x: -224, y: -50 },
      { name: 'jo', x: 0, y: -70 },
      { name: 'az', x: -240, y: 0 },
      { name: 'la', x: -208, y: -70 },
      { name: 'gn', x: -48, y: -50 },
      { name: 'rs', x: -208, y: -110 },
      { name: 'gf', x: -192, y: -40 },
      { name: 'bv', x: 0, y: -20 },
      { name: 'pt', x: -112, y: -110 },
      { name: 'fj', x: -64, y: -40 },
      { name: 'mw', x: -176, y: -90 },
      { name: 'cv', x: -16, y: -30 },
      { name: 'ms', x: -112, y: -90 },
      { name: 'ir', x: -160, y: -60 },
      { name: 'tr', x: 0, y: -140 },
      { name: 'mx', x: -192, y: -90 },
      { name: 'nz', x: -160, y: -100 },
      { name: 'pf', x: -224, y: -100 },
      { name: 'aw', x: -208, y: 0 },
      { name: 'ke', x: -32, y: -70 },
      { name: 'sn', x: -192, y: -120 },
      { name: 'gw', x: -160, y: -50 },
      { name: 'ck', x: -160, y: -20 },
      { name: 'kn', x: -112, y: -70 },
      { name: 'cu', x: 0, y: -30 },
      { name: 'ps', x: -96, y: -110 },
      { name: 'pl', x: -32, y: -110 },
      { name: 'sb', x: -16, y: -120 },
      { name: 'mg', x: -208, y: -80 },
      { name: 'td', x: -96, y: -130 },
      { name: 'mp', x: -64, y: -90 },
      { name: 'ag', x: -48, y: 0 },
      { name: 'fo', x: -112, y: -40 },
      { name: 'ru', x: -224, y: -110 },
      { name: 'zw', x: -112, y: -150 },
      { name: 'iq', x: -144, y: -60 },
      { name: 'au', x: -192, y: 0 },
      { name: 'gy', x: -176, y: -50 },
      { name: 'rw', x: -240, y: -110 },
      { name: 'gu', x: -144, y: -50 },
      { name: 'ht', x: 0, y: -60 },
      { name: 'fr', x: -128, y: -40 },
      { name: 'vc', x: -176, y: -140 },
      { name: 'sh', x: -96, y: -120 },
      { name: 'an', x: -112, y: 0 },
      { name: 'ca', x: -64, y: -20 },
      { name: 'hr', x: -240, y: -50 },
      { name: 'nl', x: -80, y: -100 },
      { name: 'vi', x: -224, y: -140 },
      { name: 'tn', x: -224, y: -130 },
      { name: 'at', x: -176, y: 0 },
      { name: 'es', x: 0, y: -40 },
      { name: 'tl', x: -192, y: -130 },
      { name: 'im', x: -96, y: -60 },
      { name: 'sx', x: -32, y: -130 },
      { name: 'fm', x: -96, y: -40 },
      { name: 'ec', x: -176, y: -30 },
      { name: 'bm', x: -160, y: -10 },
      { name: 'dj', x: -96, y: -30 },
      { name: 'lv', x: -96, y: -80 },
      { name: 'sz', x: -64, y: -130 },
      { name: 'bt', x: -240, y: -10 },
      { name: 'sg', x: -80, y: -120 },
      { name: 'mo', x: -48, y: -90 },
      { name: 'ug', x: -96, y: -140 },
      { name: 'is', x: -176, y: -60 },
      { name: 'na', x: -240, y: -90 },
      { name: 'ad', x: 0, y: 0 },
      { name: 'ly', x: -112, y: -80 },
      { name: 've', x: -192, y: -140 },
      { name: 'pg', x: -240, y: -100 },
      { name: 'bb', x: -16, y: -10 },
      { name: 'tk', x: -176, y: -130 },
      { name: 'uy', x: -128, y: -140 },
      { name: 'ph', x: 0, y: -110 },
      { name: 'vn', x: -240, y: -140 },
      { name: 'mh', x: -224, y: -80 },
      { name: 'ch', x: -128, y: -20 },
      { name: 'pm', x: -48, y: -110 },
      { name: 'qa', x: -160, y: -110 },
      { name: 'pk', x: -16, y: -110 },
      { name: 'jm', x: -240, y: -60 },
      { name: 'kg', x: -48, y: -70 },
      { name: 'cw', x: -32, y: -30 },
      { name: 'ao', x: -128, y: 0 },
      { name: 'ne', x: -16, y: -100 },
      { name: 'tm', x: -208, y: -130 },
      { name: 'mz', x: -224, y: -90 },
      { name: 'yt', x: -64, y: -150 },
      { name: 'mc', x: -144, y: -80 },
      { name: 'cy', x: -48, y: -30 },
      { name: 'pa', x: -192, y: -100 },
      { name: 'ae', x: -16, y: 0 },
      { name: 'by', x: -32, y: -20 },
      { name: 'mt', x: -128, y: -90 },
      { name: 'br', x: -208, y: -10 },
      { name: 'kw', x: -160, y: -70 },
      { name: 'je', x: -224, y: -60 },
      { name: 'kr', x: -144, y: -70 },
      { name: 'uz', x: -144, y: -140 },
      { name: 'gi', x: 0, y: -50 },
      { name: 'eh', x: -224, y: -30 },
      { name: 'be', x: -48, y: -10 },
      { name: 'ge', x: -176, y: -40 },
      { name: 'lk', x: -16, y: -80 },
      { name: 'mf', x: -192, y: -80 },
      { name: 'ci', x: -144, y: -20 },
      { name: 'gr', x: -96, y: -50 },
      { name: 'bd', x: -32, y: -10 },
      { name: 'ml', x: 0, y: -90 },
      { name: 'it', x: -192, y: -60 },
      { name: 'ki', x: -80, y: -70 },
      { name: 'vu', x: 0, y: -150 },
      { name: 'io', x: -128, y: -60 },
      { name: 'sa', x: 0, y: -120 },
      { name: 'hk', x: -192, y: -50 },
      { name: 'st', x: 0, y: -130 },
      { name: 'wf', x: -16, y: -150 },
      { name: 'ws', x: -32, y: -150 },
      { name: 'eg', x: -208, y: -30 },
      { name: 'ga', x: -144, y: -40 },
      { name: 'ro', x: -192, y: -110 },
      { name: 'cl', x: -176, y: -20 },
      { name: 'mr', x: -96, y: -90 },
      { name: 'za', x: -80, y: -150 },
      { name: 'cr', x: -240, y: -20 },
      { name: 'dm', x: -128, y: -30 },
      { name: 'sc', x: -32, y: -120 },
      { name: 'bh', x: -96, y: -10 },
      { name: 'mn', x: -32, y: -90 },
      { name: 'np', x: -112, y: -100 },
      { name: 'sr', x: -224, y: -120 },
      { name: 'cz', x: -64, y: -30 },
      { name: 'nu', x: -144, y: -100 },
      { name: 'al', x: -80, y: 0 },
      { name: 'bn', x: -176, y: -10 },
      { name: 'ye', x: -48, y: -150 },
      { name: 'as', x: -160, y: 0 },
      { name: 'de', x: -80, y: -30 },
      { name: 'bz', x: -48, y: -20 },
      { name: 'ee', x: -192, y: -30 },
      { name: 'se', x: -64, y: -120 },
      { name: 'pr', x: -80, y: -110 },
      { name: 'ax', x: -224, y: 0 },
      { name: 'sd', x: -48, y: -120 },
      { name: 'th', x: -144, y: -130 },
      { name: 'bo', x: -192, y: -10 },
      { name: 'kp', x: -128, y: -70 },
      { name: 'lu', x: -80, y: -80 },
      { name: 'eu', x: -32, y: -40 },
      { name: 'bj', x: -128, y: -10 },
      { name: 'tf', x: -112, y: -130 },
      { name: 'tw', x: -48, y: -140 },
      { name: 'us', x: -112, y: -140 },
      { name: 'tg', x: -128, y: -130 },
      { name: 'cd', x: -80, y: -20 },
      { name: 'sm', x: -176, y: -120 },
      { name: 'bw', x: -16, y: -20 },
      { name: 'gt', x: -128, y: -50 },
      { name: 'lr', x: -32, y: -80 },
      { name: 'my', x: -208, y: -90 },
      { name: 'ba', x: 0, y: -10 },
      { name: 'md', x: -160, y: -80 },
      { name: 'pe', x: -208, y: -100 },
      { name: 'tz', x: -64, y: -140 },
      { name: 'to', x: -240, y: -130 },
      { name: 'lc', x: -240, y: -70 },
      { name: 'lb', x: -224, y: -70 },
      { name: 'ma', x: -128, y: -80 },
      { name: 'tc', x: -80, y: -130 },
      { name: 'hm', x: -208, y: -50 },
      { name: 'no', x: -96, y: -100 },
      { name: 'er', x: -240, y: -30 },
      { name: 'gs', x: -112, y: -50 },
      { name: 'dz', x: -160, y: -30 },
      { name: 'bi', x: -112, y: -10 },
      { name: 'fi', x: -48, y: -40 },
      { name: 'ss', x: -240, y: -120 },
      { name: 'mu', x: -144, y: -90 },
      { name: 'bf', x: -64, y: -10 },
      { name: 'nr', x: -128, y: -100 },
      { name: 'tj', x: -160, y: -130 },
      { name: 'bg', x: -80, y: -10 },
      { name: 'sl', x: -160, y: -120 },
      { name: 'hu', x: -16, y: -60 },
      { name: 'sk', x: -144, y: -120 },
      { name: 'so', x: -208, y: -120 },
      { name: 'bl', x: -144, y: -10 },
      { name: 'do', x: -144, y: -30 },
      { name: 'cf', x: -96, y: -20 },
      { name: 'cn', x: -208, y: -20 },
      { name: 'tt', x: -16, y: -140 },
      { name: 'fk', x: -80, y: -40 },
      { name: 'co', x: -224, y: -20 },
      { name: 'me', x: -176, y: -80 },
      { name: 'gp', x: -64, y: -50 },
      { name: 'om', x: -176, y: -100 },
      { name: 'zm', x: -96, y: -150 },
      { name: 'km', x: -96, y: -70 },
      { name: 'bs', x: -224, y: -10 },
      { name: 're', x: -176, y: -110 },
      { name: 'vg', x: -208, y: -140 },
      { name: 'pn', x: -64, y: -110 },
      { name: 'pw', x: -128, y: -110 },
      { name: 'lt', x: -64, y: -80 },
      { name: 'si', x: -112, y: -120 },
      { name: 'ar', x: -144, y: 0 },
      { name: 'py', x: -144, y: -110 },
      { name: 'am', x: -96, y: 0 },
      { name: 'sj', x: -128, y: -120 },
      { name: 'ky', x: -176, y: -70 },
      { name: 'gg', x: -224, y: -40 },
      { name: 'ng', x: -48, y: -100 },
      { name: 'va', x: -160, y: -140 }
    ];

    const defs = svg.append('defs')
      .selectAll('pattern')
      .data(imagePos)
      .enter()
      .append('pattern')
      .attr('width', 16)
      .attr('height', 10)
      .attr('id', (d) => {
        return 'pattern_' + d.name;
      });

    // image positioned per Mark's answer on stackoverflow
    // http://stackoverflow.com/questions/43696831/d3-force-directed-graph-why-dont-the-flags-appear/43699769
    defs.append('image')
      .attr('xlink:href', 'https://s3.amazonaws.com/andydlindsay-fcc/flags.png')
      .attr('x', (d) => d['x'])
      .attr('y', (d) => d['y'])
      .attr('width', '256')
      .attr('height', '160');


    // links
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    // nodes
    const node = svg.selectAll('node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    node.append('rect')
      .attr('width', 16)
      .attr('height', 10)
      .style('stroke', 'none')
      .attr('fill', (d) => {
        return 'url(#pattern_' + d['code'] + ')';
      });

    // title
    node.append('title')
      .text((d) => d['country']);

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force<ForceLink<any, any>>('link').links(links);

    function ticked() {
      node.attr('transform', (d) => {
        return 'translate(' + d['x'] + ', ' + d['y'] + ')';
      });
      link
        .attr('x1', (d) => d['source'].x)
        .attr('y1', (d) => d['source'].y)
        .attr('x2', (d) => d['target'].x)
        .attr('y2', (d) => d['target'].y);
      // node
      //   .attr('cx', (d) => d['x'])
      //   .attr('cy', (d) => d['y']);
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }

}
