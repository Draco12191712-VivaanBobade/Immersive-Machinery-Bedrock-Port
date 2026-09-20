import {
  world,
  system,
  ItemStack,
  EquipmentSlot,
  InputButton,
  ButtonState,
  InputPermissionCategory,
} from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
var W = world,
  SY = system;
let M = {},
  PL = {},
  TK = 0;
var VERSION = "0.0.1",
  unused1 = 0,
  tmp;
var C = {
  shrange: 5,
  fph: 20,
  fc: 1,
  boom: 1,
  boomr: 3,
  boomfire: 0,
  boomblk: 0,
  dropit: 1,
  regen: 100,
  rspeed: 0.1,
};
let THINGS = ["tunnel_digger", "bamboo_bee", "redstone_sheep", "copperfin"];
var ST = {
  tunnel_digger: {
    durability: 4,
    drillingSpeed: 8,
    fuel: 3,
    yawSpeed: 7,
    engineSpeed: 0.1,
    verticalSpeed: 0.025,
    rollFactor: 5,
    mass: 5,
    groundFriction: 0.8,
  },
  bamboo_bee: {
    durability: 1,
    fuel: 0,
    engineSpeed: 0.35,
    yawSpeed: 8,
    verticalSpeed: 0.35,
    rollFactor: 2,
    mass: 1,
    groundFriction: 0.95,
  },
  redstone_sheep: {
    durability: 1,
    fuel: 1,
    engineSpeed: 0.1,
    yawSpeed: 10,
    verticalSpeed: 0,
    rollFactor: 0,
    mass: 1,
    groundFriction: 0.95,
  },
  copperfin: {
    durability: 1,
    fuel: 0.5,
    yawSpeed: 10,
    engineSpeed: 0.075,
    verticalSpeed: 0.35,
    rollFactor: 5,
    mass: 2,
    groundFriction: 0.8,
  },
};
var DEF = {
  friction: 0.015,
  horizontalDecay: 0.97,
  verticalDecay: 0.97,
  rotationDecay: 0.97,
  acceleration: 1,
  fuel: 1,
  durability: 1,
  groundFriction: 0.95,
  engineSpeed: 0,
  verticalSpeed: 0,
  yawSpeed: 0,
  rollFactor: 0,
  mass: 1,
  drillingSpeed: 1,
};
var LAY = {
  tunnel_digger: { n: 54, up: [0], sh: [1], bo: [2], cg: [3, 53] },
  bamboo_bee: { n: 16, wk: [0], fl: [1, 15] },
  redstone_sheep: { n: 16, bo: [0], cg: [1, 15] },
  copperfin: { n: 14, bo: [0], up: [1, 2, 3, 4], cg: [5, 13] },
};
let UPG = {
  "immersive:diamond_drill": { drillingSpeed: 0.4 },
  "immersive:netherite_drill": { drillingSpeed: 0.8 },
};
var SEAT = { tunnel_digger: 1, copperfin: 1 };
var BOX = {
  tunnel_digger: [2.8, 2.8],
  bamboo_bee: [0.8, 0.625],
  redstone_sheep: [0.8, 0.8],
  copperfin: [1.5, 1.625],
};
var DESC = {
  tunnel_digger: "A machine that can dig tunnels with ease.",
  bamboo_bee: "A small, programmable drone moving around items.",
  redstone_sheep:
    "Harvests crops in its vicinity and returns to its spawn when full or idle.",
  copperfin:
    "Powered by a conduit, it allows for easier underwater travel and work.",
};
var BURN = {
  coal: 1600,
  charcoal: 1600,
  coal_block: 16e3,
  lava_bucket: 2e4,
  blaze_rod: 2400,
  dried_kelp_block: 4e3,
  stick: 100,
  bamboo: 50,
  scaffolding: 400,
  bowl: 100,
  bow: 300,
  wooden_sword: 200,
  wooden_pickaxe: 200,
  wooden_axe: 200,
  wooden_shovel: 200,
  wooden_hoe: 200,
  crossbow: 300,
  ladder: 300,
  chest: 300,
  trapped_chest: 300,
  barrel: 300,
  crafting_table: 300,
  bookshelf: 300,
  noteblock: 300,
  jukebox: 300,
  bee_nest: 300,
  beehive: 300,
  cartography_table: 300,
  fletching_table: 300,
  loom: 300,
  smithing_table: 300,
  lectern: 300,
  composter: 300,
  boat: 1200,
  chest_boat: 1200,
  dead_bush: 100,
  azalea: 100,
  flowering_azalea: 100,
  big_dripleaf: 100,
  small_dripleaf: 100,
  mangrove_roots: 300,
  bamboo_mosaic: 300,
  bamboo_block: 300,
};
var HARDWORDS = [
  ["crying_obsidian", 50],
  ["obsidian", 50],
  ["ancient_debris", 30],
  ["netherite_block", 50],
  ["enchanting_table", 5],
  ["anvil", 5],
  ["ender_chest", 22.5],
  ["respawn_anchor", 50],
  ["copper", 3],
  ["iron_block", 5],
  ["gold_block", 3],
  ["diamond_block", 5],
  ["emerald_block", 5],
  ["lapis_block", 3],
  ["redstone_block", 5],
  ["deepslate", 3.5],
  ["_ore", 3],
  ["blackstone", 1.5],
  ["basalt", 1.25],
  ["tuff", 1.5],
  ["andesite", 1.5],
  ["diorite", 1.5],
  ["granite", 1.5],
  ["cobble", 2],
  ["brick", 2],
  ["concrete", 1.8],
  ["terracotta", 1.25],
  ["glazed", 1.4],
  ["quartz", 0.8],
  ["prismarine", 1.5],
  ["purpur", 1.5],
  ["end_stone", 3],
  ["netherrack", 0.4],
  ["stone", 1.5],
  ["log", 2],
  ["_wood", 2],
  ["planks", 2],
  ["stem", 2],
  ["hyphae", 2],
  ["fence", 2],
  ["door", 3],
  ["sign", 1],
  ["chest", 2.5],
  ["barrel", 2.5],
  ["crafting_table", 2.5],
  ["bookshelf", 1.5],
  ["wool", 0.8],
  ["carpet", 0.1],
  ["leaves", 0.2],
  ["glass", 0.3],
  ["ice", 0.5],
  ["snow", 0.2],
  ["clay", 0.6],
  ["gravel", 0.6],
  ["sand", 0.5],
  ["dirt", 0.5],
  ["grass", 0.6],
  ["podzol", 0.5],
  ["mycelium", 0.5],
  ["mud", 0.5],
  ["moss", 0.1],
  ["soul_s", 0.5],
  ["farmland", 0.6],
  ["path", 0.65],
  ["hay", 0.5],
  ["sponge", 0.6],
  ["melon", 1],
  ["pumpkin", 1],
  ["cactus", 0.4],
  ["bamboo", 1],
  ["scaffolding", 0.1],
  ["vine", 0.2],
  ["web", 4],
  ["froglight", 0.3],
  ["amethyst", 1.5],
  ["budding", 1.5],
  ["calcite", 0.75],
  ["dripstone", 1.5],
  ["smooth", 2],
  ["polished", 1.5],
  ["slab", 2],
  ["stairs", 2],
  ["wall", 2],
];
var NOGO = [
  "bedrock",
  "barrier",
  "command_block",
  "structure_block",
  "structure_void",
  "jigsaw",
  "light_block",
  "end_portal",
  "nether_portal",
  "end_gateway",
  "reinforced_deepslate",
  "moving_block",
  "allow",
  "deny",
  "border_block",
  "frame",
  "air",
  "water",
  "lava",
  "flowing",
  "bubble_column",
  "beacon",
];
var CROPS = {
  "minecraft:wheat": ["growth", 7],
  "minecraft:carrots": ["growth", 7],
  "minecraft:potatoes": ["growth", 7],
  "minecraft:beetroot": ["growth", 7],
  "minecraft:nether_wart": ["age", 3],
  "minecraft:cocoa": ["age", 2],
  "minecraft:pitcher_crop": ["growth", 4],
  "minecraft:torchflower_crop": ["growth", 2],
};
function takeit(p, e, s) {
  var it = toitem(e, s);
  var pc = p.getComponent("minecraft:inventory").container;
  if (pc.emptySlotsCount < 1) e.dimension.spawnItem(it, e.location);
  else pc.addItem(it);
  sd9(e, "random.anvil_land", 0.7, 1.6);
  delete M[e.id];
  e.remove();
}
function doDigger(e, s) {
  checkrider(e, s);
  var ph = dophys(e, s);
  var inp = getkeys(e, s);
  if (inp) {
    target1(e, s, 1);
    s.dy = inp.my > 0 ? 1 : inp.my < 0 ? -1 : 0;
    s.dg = (inp.my != 0 || inp.mz > 0) && s.don && pwr(s) > 0.1 ? 1 : 0;
    var yr = e.getRotation().y - p9(e, "yawSpeed") * s.px;
    if (inp.mx == 0) yr = yr * 0.94 + Math.round(yr / 90) * 90 * 0.06;
    e.setRotation({ x: 0, y: yr });
    var f = dirF(yr);
    if (inp.mx == 0 && inp.mz == 0) {
      var l = e.location;
      var dx = l.x - (Math.round(l.x - 0.5) + 0.5),
        dz = l.z - (Math.round(l.z - 0.5) + 0.5);
      domove(e, s, -dx * 0.04, -dz * 0.04, ph);
    } else {
      var sp = spd2(e, s) * s.pz;
      domove(
        e,
        s,
        e.isOnGround ? f.x * sp : 0,
        e.isOnGround ? f.z * sp : 0,
        ph,
      );
      bump(e, s, f, inp.mz);
    }
  } else {
    s.dy = 0;
    s.dg = 0;
    target1(e, s, 0);
    domove(e, s, 0, 0, ph);
  }
  setthing(e, "drilling", s.dg ? true : false);
  setthing(e, "moving", veclen(sv9(s)) > 0.0032);
  if (s.dg) {
    s.dp = Math.min(s.dp + drillspd(e, s) / 20, 1);
    if (s.dp > 0) dodig(e, s);
  }
  if (pwr(s) > 0.05 && rng() < s.spin + pwr(s) * 0.35) {
    var yy = e.getRotation().y,
      ff = dirF(yy),
      rr = dirR(yy),
      l2 = e.location;
    pt9(e, "immersive:exhaust_smoke", {
      x: l2.x + rr.x - ff.x * 0.9375,
      y: l2.y + 2.45,
      z: l2.z + rr.z - ff.z * 0.9375,
    });
  }
}
function flslots(k) {
  return makelist(0, LAY[k].fl);
}
function breakit(e, p) {
  var b = e.dimension.getBlock(p);
  if (!b) return 0;
  var h = hardnum(b.typeId);
  if (h < 0) return 0;
  try {
    e.dimension.runCommand(
      "setblock " + p.x + " " + p.y + " " + p.z + " air destroy",
    );
  } catch (x) {
    return 0;
  }
  pt9(e, "immersive:drill_dust", { x: p.x + 0.5, y: p.y + 0.5, z: p.z + 0.5 });
  suck(e, p, 1.2);
  eatshard(e, h);
  return h;
}
function upby(e, dy) {
  var l = e.location;
  return { x: l.x, y: l.y + dy, z: l.z };
}
function bump(e, s, f, mz) {
  if (mz <= 0 || !e.isOnGround) return;
  var l = e.location,
    w = box(e)[0] / 2 + 0.35;
  var a = getblk(e.dimension, l.x + f.x * w, l.y + 0.25, l.z + f.z * w);
  var b = getblk(e.dimension, l.x + f.x * w, l.y + 1.4, l.z + f.z * w);
  if (
    a &&
    a.typeId.indexOf("air") < 0 &&
    hardnum(a.typeId) > 0.05 &&
    b &&
    b.typeId.indexOf("air") >= 0
  ) {
    var v = e.getVelocity();
    if (v.y < 0.3) e.applyImpulse({ x: 0, y: 0.36, z: 0 });
  }
}
function upslots(k) {
  return LAY[k].up || [];
}
function walkto2(e, s, p, dist, ph) {
  var l = e.location;
  var cx = p.x + 0.5,
    cz = p.z + 0.5;
  if (Math.max(Math.abs(cx - l.x), Math.abs(cz - l.z)) < dist) {
    s.stuck = 0;
    return true;
  }
  var dx = cx - l.x,
    dz = cz - l.z,
    d = Math.sqrt(dx * dx + dz * dz);
  if (d < 1e-4) {
    s.stuck = 0;
    return true;
  }
  var sp = spd2(e, s) * 4.2;
  if (sp < 0.02) sp = 0.02;
  var fb = getblk(
    e.dimension,
    l.x + (dx / d) * 0.7,
    l.y + 0.25,
    l.z + (dz / d) * 0.7,
  );
  var ub = getblk(
    e.dimension,
    l.x + (dx / d) * 0.7,
    l.y + 1.3,
    l.z + (dz / d) * 0.7,
  );
  var jump =
    fb &&
    fb.typeId.indexOf("air") < 0 &&
    hardnum(fb.typeId) > 0.05 &&
    ub &&
    ub.typeId.indexOf("air") >= 0 &&
    e.isOnGround
      ? 0.42
      : 0;
  var v = e.getVelocity();
  e.applyImpulse({ x: (dx / d) * sp - v.x, y: jump, z: (dz / d) * sp - v.z });
  s.stuck++;
  if (s.stuck > 100) {
    s.stuck = 0;
    if (s.tk2) {
      for (var i = 0; i < s.bset.length; i++)
        if (samepos(s.bset[i], s.tk2)) {
          s.bset.splice(i, 1);
          break;
        }
      s.tk2 = null;
    } else s.rel = 0;
  }
  return false;
}
function iscreative(p) {
  var g = p.getGameMode ? "" + p.getGameMode() : "";
  return g.toLowerCase() == "creative";
}
function setthing(e, k, v) {
  e.setProperty("immersive:" + k, v);
}
function makelist(l, a) {
  if (!a) return [];
  if (a.length == 2 && a[1] > a[0] + 1) {
    var o = [];
    for (var i = a[0]; i <= a[1]; i++) o.push(i);
    return o;
  }
  return a.slice();
}
function checkrider(e, s) {
  var r = e.getComponent("minecraft:rideable");
  var rd = r ? r.getRiders()[0] : null;
  if (rd && !s.rider) {
    s.rider = rd.id;
    if (s.k == "copperfin") sd9(e, "immersive.hatch_close", 1, 1);
    if (rd.typeId == "minecraft:player") {
      rd.inputPermissions.setPermissionCategory(
        InputPermissionCategory.Dismount,
        false,
      );
      PL[rd.id] = e.id;
      rd.onScreenDisplay.setActionBar(
        "§6jump/sneak§7 " +
          (s.k == "tunnel_digger" ? "aims the drill" : "changes depth") +
          " §8| §6jump+sneak§7 exits §8| §6use an item§7 for " +
          (s.k == "copperfin" ? "sonar" : "the drill"),
      );
    }
  } else if (!rd && s.rider) {
    var was = s.rider;
    s.rider = null;
    if (s.k == "copperfin") sd9(e, "immersive.hatch_open", 1, 1);
    var pl = W.getAllPlayers();
    for (var i = 0; i < pl.length; i++)
      if (pl[i].id == was) {
        pl[i].inputPermissions.setPermissionCategory(
          InputPermissionCategory.Dismount,
          true,
        );
        delete PL[was];
      }
  } else if (rd) s.rider = rd.id;
}
function dophys(e, s) {
  var k = s.k;
  var dec = 1 - gg(k, "friction");
  if (e.isInWater && k != "copperfin") dec = 0.9;
  else if (e.isOnGround) dec = gg(k, "groundFriction");
  var rf = dec * gg(k, "rotationDecay");
  s.px = s.px * rf;
  s.pz = s.pz * rf;
  s.py = s.py * rf;
  return { dec, hd: gg(k, "horizontalDecay"), vd: gg(k, "verticalDecay") };
}
function addItem(e, st2) {
  if (!st2 || st2.amount <= 0) return null;
  var c = getinv(e);
  if (!c) return st2;
  var sl = cgslots(zz(e));
  if (!sl.length) sl = wkslots(zz(e));
  if (!sl.length) return st2;
  var left = st2.amount;
  for (var i = 0; i < sl.length && left > 0; i++) {
    var o = c.getItem(sl[i]);
    if (o && o.typeId == st2.typeId && o.amount < o.maxAmount) {
      var add = Math.min(left, o.maxAmount - o.amount);
      o.amount = o.amount + add;
      c.setItem(sl[i], o);
      left -= add;
    }
  }
  for (var i2 = 0; i2 < sl.length && left > 0; i2++) {
    if (!c.getItem(sl[i2])) {
      var put = Math.min(left, st2.maxAmount);
      c.setItem(sl[i2], new ItemStack(st2.typeId, put));
      left -= put;
    }
  }
  if (left <= 0) return null;
  return new ItemStack(st2.typeId, left);
}
function cleanslots(e, s) {
  if (TK % 20 != 0) return;
  var c = getinv(e);
  if (!c) return;
  var bs = boslots(s.k),
    us = upslots(s.k),
    hs = shslots(s.k);
  for (var i = 0; i < bs.length; i++) {
    var a = c.getItem(bs[i]);
    if (a && fuelnum(a.typeId) <= 0) {
      e.dimension.spawnItem(a, upby(e, 1));
      c.setItem(bs[i], void 0);
    }
  }
  for (var j = 0; j < us.length; j++) {
    var b = c.getItem(us[j]);
    if (b && !UPG[b.typeId]) {
      e.dimension.spawnItem(b, upby(e, 1));
      c.setItem(us[j], void 0);
    }
  }
  for (var k = 0; k < hs.length; k++) {
    var d = c.getItem(hs[k]);
    if (d && d.typeId != "minecraft:amethyst_shard") {
      e.dimension.spawnItem(d, upby(e, 1));
      c.setItem(hs[k], void 0);
    }
  }
}
function showcps(p, e) {
  var s = getstuff(e),
    f = new ActionFormData();
  f.title("§6Containers");
  if (!s.cps.length)
    f.body({
      rawtext: [
        { translate: "immersive.ui.no_containers" },
        { text: "\n\n" },
        { translate: "immersive.gui.bamboo_bee.tooltip.help1" },
        { text: "\n" },
        { translate: "immersive.gui.bamboo_bee.tooltip.help2" },
      ],
    });
  else {
    var t = "";
    for (var i = 0; i < s.cps.length; i++) {
      var q = s.cps[i];
      t +=
        (q.i ? "§a-> " : "§b<- ") +
        q.n +
        " §8" +
        q.p.x +
        " " +
        q.p.y +
        " " +
        q.p.z +
        "\n";
    }
    f.body(t);
  }
  f.button({ translate: "immersive.ui.clear" });
  f.button("§8Back");
  f.show(p).then(function (r) {
    if (r.canceled) return;
    if (r.selection == 0) {
      s.cps = [];
      s.task = null;
      saveit(e, s);
      p.onScreenDisplay.setActionBar({
        translate: "immersive.gui.bamboo_bee.positions_cleared",
      });
    } else showmenu(p, e);
  });
}
function rng() {
  return Math.random();
}
function setdesc(it, k) {
  it.setLore(["§7" + DESC[k], "§8sneak + use it on the machine for the panel"]);
}
function movang(a, t, mx) {
  var f = fixang(t - a);
  if (f > mx) f = mx;
  if (f < -mx) f = -mx;
  return a + f;
}
function doFin(e, s) {
  checkrider(e, s);
  var ph = dophys(e, s);
  var uw = iswet(e);
  if (s.son > 0) s.son--;
  var inp = getkeys(e, s);
  var sp = spd2(e, s) * (uw ? 1 : 0);
  if (inp) {
    target1(e, s, 1);
    var yr = e.getRotation().y - p9(e, "yawSpeed") * s.px;
    e.setRotation({ x: 0, y: yr });
    var f = dirF(yr);
    var vy = sp * p9(e, "verticalSpeed") * s.py;
    domove(e, s, f.x * sp * s.pz, f.z * sp * s.pz, ph, vy, uw);
    if (TK % 20 == 0)
      inp.p.addEffect("water_breathing", 60, { showParticles: false });
    var ps = e.getComponent("minecraft:rideable").getRiders();
    for (var i = 0; i < ps.length; i++)
      if (TK % 20 == 0 && ps[i].id != inp.p.id)
        ps[i].addEffect("water_breathing", 60, { showParticles: false });
  } else {
    target1(e, s, 0);
    domove(e, s, 0, 0, ph, 0, uw);
  }
  if (TK % 13 == 0) {
    var air = false,
      l = e.location,
      bh = box(e)[1];
    for (var y = Math.floor(l.y + bh); y >= Math.floor(l.y); y--) {
      var b = getblk(e.dimension, l.x, y, l.z);
      if (!b) continue;
      if (b.typeId.indexOf("water") < 0) {
        air = true;
        continue;
      }
      if (!air) continue;
      s.ws = y + 0.875;
      break;
    }
  }
  var uf = cl((s.ws - e.location.y) / box(e)[1], 0, 1);
  if (uf >= s.drip) s.drip = uf;
  else if (uf < 0.6) {
    s.drip = Math.max(0, s.drip - 0.005);
    if (rng() < s.drip)
      pt9(e, "immersive:turbine_bubble", upby(e, 1.625 * rng()));
  }
  if (uf <= s.bub) s.bub = uf;
  else if (uf > 0.8) {
    s.bub = Math.min(1, s.bub + 0.01);
    if (rng() < 0.5) pt9(e, "immersive:turbine_bubble", upby(e, rng() * 1.6));
  }
  var rsp = veclen(sv9(s));
  if (uf > 0.6 && s.pz > -0.01 && uw && rng() < rsp * 8 + 0.25) {
    var f2 = dirF(e.getRotation().y);
    pt9(e, "immersive:turbine_bubble", {
      x: e.location.x - f2.x,
      y: e.location.y + box(e)[1] * 0.5,
      z: e.location.z - f2.z,
    });
  }
  if (uf > 0 && uf < 1 && rsp > 0.001 && rng() < 0.1)
    sd9(e, "random.splash", 1, 0.8 + 0.4 * rng());
  if (s.rider) {
    s.amb -= e.location.y < s.l2y - 1e-5 ? 1 : 3;
    if (s.amb <= 0) {
      s.amb = 100 + Math.floor(rng() * 250);
      sd9(e, "immersive.submarine_ambience", 1, 1);
    }
  }
}
function hardnum(id) {
  for (var i = 0; i < NOGO.length; i++) if (id.indexOf(NOGO[i]) >= 0) return -1;
  for (var j = 0; j < HARDWORDS.length; j++)
    if (id.indexOf(HARDWORDS[j][0]) >= 0) return HARDWORDS[j][1];
  return 1.5;
}
function box(e) {
  return BOX[zz(e)];
}
function drillspd(e, s) {
  return (gotshards(e) ? 2 : 1) * p9(e, "drillingSpeed");
}
function getstuff(e) {
  var i = e.id,
    s = M[i];
  if (s) return s;
  var k = zz(e),
    bo = boslots(k).length;
  s = {
    k,
    ep: 0,
    epv: 0,
    epl: 0,
    tgt: 0,
    spin: 0,
    snd: 0,
    px: 0,
    pz: 0,
    py: 0,
    fuel: [],
    rider: null,
    warn: 0,
    dy: 0,
    dg: 0,
    don: dd1(e, "don", 1),
    dp: 0,
    task: null,
    cd: 0,
    cps: JSON.parse(dd1(e, "cps", "[]")),
    cfg: JSON.parse(dd1(e, "cfg", '{"b":0,"t":0,"o":1}')),
    stuck: 0,
    home: null,
    tk2: null,
    rel: 0,
    res: 0,
    got: 0,
    wset: [],
    bset: [],
    rq: null,
    rv: null,
    ws: 62.875,
    amb: 0,
    son: 0,
    drip: 0,
    bub: 0,
    lx: 0,
    ly: 0,
    lz: 0,
    l2x: 0,
    l2y: 0,
    l2z: 0,
  };
  for (var j = 0; j < bo; j++) s.fuel[j] = 0;
  var f = dd1(e, "fuel", "");
  if (f) {
    var pp = ("" + f).split(",");
    for (var j2 = 0; j2 < s.fuel.length && j2 < pp.length; j2++)
      s.fuel[j2] = parseInt(pp[j2]) || 0;
  }
  var h = dd1(e, "home", "");
  if (h) {
    var q = ("" + h).split(",");
    s.home = { x: +q[0], y: +q[1], z: +q[2] };
  }
  M[i] = s;
  return s;
}
function maketext(e, s) {
  var t = [
    { translate: "item.immersive:" + s.k + ".description" },
    { text: "\n\n§fCondition §a" + Math.round(h9(e) * 100) + "%" },
  ];
  if (s.fuel.length) {
    var fu = 0;
    for (var i = 0; i < s.fuel.length; i++) fu += s.fuel[i];
    t.push({ text: "\n§fFuel §6" + Math.round(fu / 20) + "s" });
  }
  t.push({ text: "\n§fEngine §b" + Math.round(pwr(s) * 100) + "%" });
  if (s.k == "tunnel_digger") {
    t.push({ text: "\n§fDrill " + (s.don ? "§aarmed" : "§coff") });
    t.push({
      text:
        "\n§fDrill speed §b" +
        drillspd(e, s).toFixed(1) +
        (gotshards(e) ? " §d(shards)" : ""),
    });
  }
  if (s.k == "redstone_sheep" && s.home)
    t.push({
      text:
        "\n§fHome §7" +
        s.home.x +
        " " +
        s.home.y +
        " " +
        s.home.z +
        "\n§fQueue §7" +
        (s.wset.length + s.bset.length),
    });
  if (s.k == "bamboo_bee")
    t.push({
      text:
        "\n§fContainers §7" +
        s.cps.length +
        "\n§fMode §7" +
        (s.cfg.b ? "blacklist" : "whitelist") +
        " / " +
        (s.cfg.o ? "round robin" : "first"),
    });
  return { rawtext: t };
}
function flyto(e, s, p, dist) {
  var l = e.location,
    bh = box(e)[1];
  var cx = p.x + 0.5,
    cy = p.y + 0.5,
    cz = p.z + 0.5;
  var adx = Math.abs(cx - l.x),
    adz = Math.abs(cz - l.z),
    ady = Math.abs(cy - (l.y + bh / 2) + 0.5);
  if (Math.max(adx, adz, ady) < dist) {
    s.stuck = 0;
    return true;
  }
  var dx = cx - l.x,
    dy = cy - (l.y + bh / 2) + 0.5,
    dz = cz - l.z;
  var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (d < 1e-4) {
    s.stuck = 0;
    return true;
  }
  var sp = p9(e, "engineSpeed") * (pwr(s) > 0.1 ? 1 : 0.4);
  var hb = getblk(
    e.dimension,
    l.x + (dx / d) * 0.9,
    l.y + 0.4,
    l.z + (dz / d) * 0.9,
  );
  var lift = 0;
  if (hb && hb.typeId.indexOf("air") < 0 && hardnum(hb.typeId) > 0.05)
    lift = sp * 1.6;
  var v = e.getVelocity();
  e.applyImpulse({
    x: (dx / d) * sp - v.x,
    y: (dy / d) * sp + lift - v.y,
    z: (dz / d) * sp - v.z,
  });
  s.stuck++;
  if (s.stuck > 100) {
    s.stuck = 0;
    s.task = null;
    s.cd = 40;
  }
  return false;
}
function u1(s) {
  if (!s.fuel.length) return 1;
  var r = 0;
  for (var i = 0; i < s.fuel.length; i++) if (s.fuel[i] > 0) r++;
  return (r / s.fuel.length) * (islow(s) ? 0.75 : 1);
}
function cl(v, a, b) {
  return v < a ? a : v > b ? b : v;
}
function saystuff(e, t) {
  var pl = e.dimension.getEntities({
    type: "minecraft:player",
    location: e.location,
    maxDistance: 8,
  });
  for (var i = 0; i < pl.length; i++)
    pl[i].onScreenDisplay.setActionBar("§6§oBamboo Bee§r: §f" + t);
}
function suck(e, p, r) {
  var its = e.dimension.getEntities({
    type: "minecraft:item",
    location: { x: p.x + 0.5, y: p.y + 0.5, z: p.z + 0.5 },
    maxDistance: r + 1.5,
  });
  for (var i = 0; i < its.length; i++) {
    var ic = its[i].getComponent("minecraft:item");
    if (!ic) continue;
    if (!addItem(e, ic.itemStack)) its[i].remove();
  }
}
function gg(k, s) {
  var o = ST[k],
    v = o[s];
  if (v === void 0) v = DEF[s];
  return v === void 0 ? 0 : v;
}
function anyplayer(e) {
  return (
    e.dimension.getEntities({
      type: "minecraft:player",
      location: e.location,
      maxDistance: 32,
    }).length > 0
  );
}
function getblk(d, x, y, z) {
  return d.getBlock({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) });
}
function eatshard(e, sp) {
  if (rng() >= sp / 64) return;
  var c = getinv(e),
    sl = shslots(zz(e)),
    got = [];
  for (var i = 0; i < sl.length; i++) {
    var it = c.getItem(sl[i]);
    if (it && it.typeId == "minecraft:amethyst_shard") got.push(sl[i]);
  }
  if (!got.length) return;
  var pk = got[Math.floor(rng() * got.length)],
    it2 = c.getItem(pk);
  if (it2.amount > 1) {
    it2.amount = it2.amount - 1;
    c.setItem(pk, it2);
  } else c.setItem(pk, void 0);
}
function islow(s) {
  if (!s.fuel.length) return false;
  for (var i = 0; i < s.fuel.length; i++) if (s.fuel[i] > 900) return false;
  return true;
}
function closest(p) {
  var rc = p.getComponent("minecraft:riding");
  if (
    rc &&
    rc.entityRidingOn &&
    rc.entityRidingOn.typeId.indexOf("immersive:") == 0
  )
    return rc.entityRidingOn;
  var rv = p.dimension.getEntities({
    families: ["immersive_machine"],
    location: p.location,
    maxDistance: 8,
  });
  var best = null,
    bd = 1e9;
  for (var i = 0; i < rv.length; i++) {
    var a = p.location,
      b = rv[i].location,
      dx = a.x - b.x,
      dy = a.y - b.y,
      dz = a.z - b.z,
      d = dx * dx + dy * dy + dz * dz;
    if (d < bd) {
      bd = d;
      best = rv[i];
    }
  }
  return best;
}
function capit(k) {
  return k
    .split("_")
    .map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}
function canput(k, si, it) {
  var bs = boslots(k),
    us = upslots(k),
    hs = shslots(k);
  for (var i = 0; i < bs.length; i++)
    if (bs[i] == si) return fuelnum(it.typeId) > 0;
  for (var j = 0; j < us.length; j++) if (us[j] == si) return !!UPG[it.typeId];
  for (var m = 0; m < hs.length; m++)
    if (hs[m] == si) return it.typeId == "minecraft:amethyst_shard";
  return true;
}
function doSheep(e, s) {
  var ph = dophys(e, s);
  var l = e.location;
  if (!s.home || (s.home.x == 0 && s.home.y == 0 && s.home.z == 0))
    s.home = { x: Math.floor(l.x), y: Math.floor(l.y), z: Math.floor(l.z) };
  var dx = s.lx - s.l2x,
    dz = s.lz - s.l2z;
  var rot = e.getRotation();
  if (dx * dx + dz * dz > 1e-5)
    e.setRotation({
      x: 0,
      y: movang(rot.y, (Math.atan2(dz, dx) * 180) / Math.PI + 90, 10),
    });
  else
    e.setRotation({
      x: 0,
      y: movang(rot.y, Math.floor(rot.y / 90 + 0.5) * 90, 5),
    });
  if (islow(s) || isfull2(e)) s.rel = 60;
  s.res--;
  target1(e, s, s.tk2 || s.rel > 0 ? 1 : 0);
  if (s.rel > 0) {
    if (walkto2(e, s, s.home, 0.6, ph)) s.rel--;
  } else if (s.tk2) {
    if (walkto2(e, s, s.tk2, 0.95, ph)) {
      if (checkcrop(e, s.tk2) == 1) cutit(e, s, s.tk2);
      s.tk2 = null;
    }
  } else if (s.wset.length) {
    domove(e, s, 0, 0, ph);
    if ((TK + hashid(e)) % 5 == 0) {
      var bi = 0,
        bd = 1e9;
      for (var i = 0; i < s.wset.length; i++) {
        var q = s.wset[i],
          ax = q.x + 0.5 - l.x,
          ay = q.y + 0.5 - l.y,
          az = q.z + 0.5 - l.z,
          dd = ax * ax + ay * ay + az * az;
        if (dd < bd) {
          bd = dd;
          bi = i;
        }
      }
      var takeit2 = s.wset[bi],
        v2 = checkcrop(e, takeit2);
      if (v2 == 1) {
        s.tk2 = takeit2;
        s.bset.push(takeit2);
        s.got++;
        s.res = 100;
      } else if (v2 == 2) s.bset.push(takeit2);
      s.wset.splice(bi, 1);
    }
  } else if (s.bset.length) {
    domove(e, s, 0, 0, ph);
    s.wset = s.bset;
    s.bset = [];
    if (s.got == 0) {
      if (s.res <= 0) {
        if (anyplayer(e)) doscan(e, s);
        s.res = 100;
      }
      s.rel = 60;
    }
    s.got = 0;
  } else {
    domove(e, s, 0, 0, ph);
    if (s.rq) doscan(e, s);
    else if (s.res <= 0) {
      doscan(e, s);
      s.res = 100;
    }
  }
}
function getjob(e, s) {
  var ins = getpos(s, true);
  if (!ins.length) return null;
  var outs = getpos(s, false);
  if (!outs.length) return null;
  for (var i = 0; i < ins.length; i++) {
    var bc = getcont(e, ins[i].p);
    if (!bc) continue;
    for (var sl = 0; sl < bc.size; sl++) {
      var it = bc.getItem(sl);
      if (!it) continue;
      if (!checkfilter(e, s, it)) continue;
      for (var j = 0; j < outs.length; j++) {
        var oc = getcont(e, outs[j].p);
        if (!oc) continue;
        if (!canfit(oc, it)) continue;
        return { s: ins[i].p, i: sl, st: it, t: outs[j].p };
      }
    }
  }
  return null;
}
function hashid(e) {
  var h = 0,
    t = "" + e.id;
  for (var i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0;
  return Math.abs(h) % 5;
}
function isok(e) {
  if (e === null) return false;
  if (!e) return false;
  return typeof e.isValid === "function" ? e.isValid() : e.isValid !== false;
}
function showcfg(p, e) {
  var s = getstuff(e),
    f = new ModalFormData();
  f.title("§6Bamboo Bee");
  f.dropdown(
    { translate: "immersive.ui.list_mode" },
    [
      { translate: "immersive.gui.bamboo_bee.whitelist" },
      { translate: "immersive.gui.bamboo_bee.blacklist" },
    ],
    { defaultValueIndex: s.cfg.b ? 1 : 0 },
  );
  f.dropdown(
    { translate: "immersive.ui.order" },
    [
      { translate: "immersive.gui.bamboo_bee.order.first" },
      { translate: "immersive.gui.bamboo_bee.order.round_robin" },
    ],
    { defaultValueIndex: s.cfg.o ? 1 : 0 },
  );
  f.toggle(
    { translate: "immersive.ui.compare_tag" },
    { defaultValue: !!s.cfg.t },
  );
  f.show(p).then(function (r) {
    if (r.canceled) return;
    s.cfg.b = r.formValues[0] ? 1 : 0;
    s.cfg.o = r.formValues[1] ? 1 : 0;
    s.cfg.t = r.formValues[2] ? 1 : 0;
    s.task = null;
    saveit(e, s);
  });
}
function gotshards(e) {
  var c = getinv(e),
    sl = shslots(zz(e));
  for (var i = 0; i < sl.length; i++) {
    var it = c.getItem(sl[i]);
    if (it && it.typeId == "minecraft:amethyst_shard") return true;
  }
  return false;
}
function isfull2(e) {
  var c = getinv(e),
    sl = cgslots(zz(e)),
    n = 0;
  for (var i = 0; i < sl.length; i++) if (c.getItem(sl[i])) n++;
  return n > sl.length - 3;
}
function everytick() {
  TK++;
  var ds = [
    W.getDimension("overworld"),
    W.getDimension("nether"),
    W.getDimension("the_end"),
  ];
  for (var di = 0; di < ds.length; di++) {
    var es = ds[di].getEntities({ families: ["immersive_machine"] });
    for (var i = 0; i < es.length; i++) {
      var e = es[i];
      if (!isok(e)) continue;
      var s = getstuff(e);
      var l = e.location;
      s.l2x = s.lx;
      s.l2y = s.ly;
      s.l2z = s.lz;
      s.lx = l.x;
      s.ly = l.y;
      s.lz = l.z;
      doEngine(e, s);
      if (s.k == "tunnel_digger") doDigger(e, s);
      else if (s.k == "copperfin") doFin(e, s);
      else if (s.k == "bamboo_bee") doBee(e, s);
      else doSheep(e, s);
      if (C.regen > 0 && TK % C.regen == 0 && h9(e) < 1)
        sethp2(e, h9(e) + 0.05 / gg(s.k, "durability"));
      if (h9(e) < 1 && rng() > h9(e))
        pt9(e, "immersive:exhaust_smoke", upby(e, box(e)[1] * 0.6));
      if (TK % 40 == 0) saveit(e, s);
      cleanslots(e, s);
    }
  }
}
function showinv(p, e, page) {
  if (!isok(e)) return;
  var s = getstuff(e),
    c = getinv(e),
    f = new ActionFormData();
  f.title("§6" + capit(s.k));
  f.body("§7tap a slot to swap it with whatever is in your hand");
  var acts = [];
  var sp = [
    [boslots(s.k), "§6Boiler"],
    [upslots(s.k), "§bUpgrade"],
    [shslots(s.k), "§dShards"],
    [wkslots(s.k), "§aClaw"],
  ];
  for (var a = 0; a < sp.length; a++)
    for (var b = 0; b < sp[a][0].length; b++) {
      var si = sp[a][0][b];
      f.button(sp[a][1] + "§r " + slotname(c.getItem(si)));
      acts.push(si);
    }
  var fl = flslots(s.k);
  for (var i = 0; i < fl.length; i++) {
    f.button("§dFilter " + (i + 1) + "§r " + slotname(c.getItem(fl[i])));
    acts.push(fl[i]);
  }
  var cg = cgslots(s.k),
    per = 24,
    from = page * per,
    np = Math.max(1, Math.ceil(cg.length / per));
  for (var j = from; j < cg.length && j < from + per; j++) {
    f.button("§7#" + (j + 1) + "§r " + slotname(c.getItem(cg[j])));
    acts.push(cg[j]);
  }
  if (np > 1) {
    f.button("§9page " + (page + 1) + "/" + np + " §7- next");
    acts.push("pg");
  }
  f.button("§aDeposit held stack");
  acts.push("dep");
  f.button("§6Take everything");
  acts.push("all");
  f.button("§8Back");
  acts.push("back");
  f.show(p).then(function (r) {
    if (r.canceled || !isok(e)) return;
    var a2 = acts[r.selection];
    if (a2 == "back") {
      showmenu(p, e);
      return;
    }
    if (a2 == "pg") {
      showinv(p, e, (page + 1) % np);
      return;
    }
    if (a2 == "dep") {
      var lo = addItem(e, gethand(p));
      sethand(p, lo ? lo : void 0);
      showinv(p, e, page);
      return;
    }
    if (a2 == "all") {
      var pc = p.getComponent("minecraft:inventory").container;
      for (var i2 = 0; i2 < c.size; i2++) {
        var it4 = c.getItem(i2);
        if (!it4) continue;
        c.setItem(i2, void 0);
        var lo2 = pc.emptySlotsCount > 0 ? pc.addItem(it4) : it4;
        if (lo2) e.dimension.spawnItem(lo2, upby(e, 1));
      }
      showinv(p, e, page);
      return;
    }
    swapit(p, e, a2);
    showinv(p, e, page);
  });
}
function spd2(e, s) {
  var p = pwr(s);
  return p * p * p9(e, "engineSpeed");
}
function doEngine(e, s) {
  var k = s.k,
    rs = k == "redstone_sheep" ? 10 : 20;
  var steps = rs / gg(k, "acceleration");
  var wet = e.isInWater && k != "copperfin";
  s.epl = s.ep;
  s.ep = s.tgt * (wet ? 0.1 : 1);
  s.epv = s.epv * (1 - 1 / steps) + s.ep / steps;
  s.spin = Math.max(0, s.spin + (s.ep - s.epl) - 0.01);
  if (s.fuel.length && k != "redstone_sheep")
    et2(s, s.tgt * gg(k, "fuel") * C.fc);
  dofuel(e, s);
  var p = pwr(s);
  setthing(e, "engine_power", cl(p, 0, 1));
  s.snd += p * 0.25;
  if (s.snd > 1) {
    s.snd -= 1;
    if (s.fuel.length && islow(s)) s.snd -= Math.floor(rng() * 2);
    var id = "immersive.tunnel_digger",
      pt = 1;
    if (k == "tunnel_digger")
      id = s.dg
        ? "immersive.tunnel_digger_drilling"
        : "immersive.tunnel_digger";
    else if (k == "bamboo_bee") {
      id = "immersive.bamboo_bee";
      pt = 0.65 + veclen(sv9(s)) * 1.25;
    } else if (k == "redstone_sheep") {
      id = "immersive.redstone_sheep";
      pt = Math.min(1, 0.75 + veclen(sv9(s)) * 10);
    } else if (k == "copperfin") id = "immersive.submarine_engine";
    e.dimension.playSound(id, upby(e, box(e)[1] * 0.5), {
      volume: Math.min(1, 0.25 + s.spin),
      pitch: (rng() * 0.1 + 0.95) * pt,
    });
  }
  if (s.tgt > 0 && s.fuel.length) {
    var r = e.getComponent("minecraft:rideable"),
      rd = r ? r.getRiders()[0] : null;
    if (rd && rd.typeId == "minecraft:player") {
      var u = u1(s);
      if (u > 0 && islow(s)) {
        if (s.warn != 3) {
          rd.onScreenDisplay.setActionBar({
            translate: "immersive.msg.low_fuel",
          });
          s.warn = 3;
        }
      } else if (u > 0) s.warn = 2;
      else if (s.warn != 1) {
        rd.onScreenDisplay.setActionBar({ translate: "immersive.msg.no_fuel" });
        s.warn = 1;
      }
    }
  }
}
function showmenu(p, e) {
  if (!isok(e)) return;
  var s = getstuff(e),
    f = new ActionFormData();
  f.title("§6" + capit(s.k));
  f.body(maketext(e, s));
  var acts = [];
  f.button(
    { translate: "immersive.ui.inventory" },
    "textures/items/immersive/" + s.k,
  );
  acts.push("inv");
  if (s.k == "tunnel_digger") {
    f.button({ translate: "immersive.ui.drill_toggle" });
    acts.push("drill");
  }
  if (s.k == "copperfin") {
    f.button({ translate: "immersive.ui.sonar" });
    acts.push("sonar");
  }
  if (SEAT[s.k]) {
    f.button("§lPilot");
    acts.push("ride");
  }
  if (s.k == "bamboo_bee") {
    f.button({ translate: "immersive.ui.settings" });
    acts.push("cfg");
    f.button({ translate: "immersive.ui.containers" });
    acts.push("cps");
  }
  if (s.k == "redstone_sheep") {
    f.button("Set Home Here");
    acts.push("home");
  }
  if (h9(e) < 1) {
    f.button("§aRepair");
    acts.push("fix");
  }
  f.button({ translate: "immersive.ui.pick_up" });
  acts.push("take");
  f.show(p).then(function (r) {
    if (r.canceled || !isok(e)) return;
    var a = acts[r.selection];
    if (a == "inv") showinv(p, e, 0);
    else if (a == "drill") {
      s.don = s.don ? 0 : 1;
      p.onScreenDisplay.setActionBar({
        translate: s.don
          ? "immersive.tunnel_digger.drill_on"
          : "immersive.tunnel_digger.drill_off",
      });
      saveit(e, s);
    } else if (a == "sonar") {
      if (!ping(e, s))
        p.onScreenDisplay.setActionBar({
          translate: "immersive.msg.sonar_cooldown",
        });
    } else if (a == "ride") {
      var rc = e.getComponent("minecraft:rideable");
      if (rc) rc.addRider(p);
    } else if (a == "cfg") showcfg(p, e);
    else if (a == "cps") showcps(p, e);
    else if (a == "home") {
      s.home = {
        x: Math.floor(e.location.x),
        y: Math.floor(e.location.y),
        z: Math.floor(e.location.z),
      };
      s.rq = null;
      s.rv = null;
      s.wset = [];
      s.bset = [];
      s.res = 0;
      saveit(e, s);
      p.onScreenDisplay.setActionBar({ translate: "immersive.msg.home_set" });
    } else if (a == "fix") {
      sethp2(e, h9(e) + C.rspeed);
      sd9(e, "random.anvil_use", 0.7, 1.4);
      p.onScreenDisplay.setActionBar("§a" + Math.round(h9(e) * 100) + "%");
    } else if (a == "take") takeit(p, e, s);
  });
}
function h9(e) {
  var h = e.getComponent("minecraft:health");
  return h ? h.currentValue / h.defaultValue : 1;
}
function getinv(e) {
  var c = e.getComponent("minecraft:inventory");
  return c ? c.container : null;
}
function fuelnum(id) {
  var n = id.indexOf(":") >= 0 ? id.slice(id.indexOf(":") + 1) : id;
  if (BURN[n] !== void 0) return BURN[n];
  if (
    n.indexOf("log") >= 0 ||
    n.indexOf("wood") >= 0 ||
    n.indexOf("hyphae") >= 0 ||
    n.indexOf("stem") >= 0
  )
    return 300;
  if (n.indexOf("planks") >= 0) return 300;
  if (
    n.indexOf("slab") >= 0 &&
    n.indexOf("stone") < 0 &&
    n.indexOf("brick") < 0
  )
    return 150;
  if (
    n.indexOf("stairs") >= 0 &&
    n.indexOf("stone") < 0 &&
    n.indexOf("brick") < 0
  )
    return 300;
  if (n.indexOf("fence") >= 0 || n.indexOf("door") >= 0) return 300;
  if (n.indexOf("sapling") >= 0 || n.indexOf("wool") >= 0) return 100;
  if (n.indexOf("carpet") >= 0) return 67;
  if (n.indexOf("sign") >= 0) return 200;
  if (n.indexOf("boat") >= 0) return 1200;
  if (n.indexOf("bamboo") >= 0) return 50;
  return 0;
}
function zz(e) {
  var t = e.typeId;
  return t.slice(t.indexOf(":") + 1);
}
function shslots(k) {
  return LAY[k].sh || [];
}
function gethand(p) {
  var eq = p.getComponent("minecraft:equippable");
  return eq ? eq.getEquipment(EquipmentSlot.Mainhand) : void 0;
}
function issame2(s, a, b) {
  if (!a || !b) return false;
  if (s.cfg.t) return a.isStackableWith(b);
  return a.typeId == b.typeId;
}
function checkfilter(e, s, it) {
  var c = getinv(e),
    sl = flslots(s.k),
    any = false,
    hit = false;
  for (var i = 0; i < sl.length; i++) {
    var f = c.getItem(sl[i]);
    if (!f) continue;
    any = true;
    if (issame2(s, it, f)) hit = true;
  }
  if (!any) return true;
  return s.cfg.b ? !hit : hit;
}
function doscan(e, s) {
  if (!s.rq) {
    s.wset = [];
    s.bset = [];
    s.rq = [s.home];
    s.rv = {};
    s.rv[s.home.x + "," + s.home.y + "," + s.home.z] = 1;
    s.rn = 1;
  }
  var r = C.shrange,
    n = 0;
  while (s.rq.length && n < 2) {
    var o = s.rq.shift();
    n++;
    for (var x = -r; x <= r; x++)
      for (var z = -r; z <= r; z++) {
        var p = { x: o.x + x, y: o.y, z: o.z + z },
          k = p.x + "," + p.y + "," + p.z;
        if (s.rv[k]) continue;
        s.rv[k] = 1;
        s.rn++;
        if (checkcrop(e, p) == 0) continue;
        if (s.wset.length < 512) s.wset.push(p);
        if (s.rq.length < 256) s.rq.push(p);
      }
    if (s.rn > 2200) {
      s.rq = null;
      s.rv = null;
      return;
    }
  }
  if (!s.rq.length) {
    s.rq = null;
    s.rv = null;
  }
}
function pt9(e, id, l) {
  e.dimension.spawnParticle(id, l || e.location);
}
function veclen2(v) {
  var t = v.x * v.x + v.y * v.y + v.z * v.z;
  return Math.sqrt(t);
}
function veclen(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}
function putdown(p, it, bl, k) {
  var d = p.dimension;
  var e = d.spawnEntity("immersive:" + k, {
    x: Math.floor(bl.x) + 0.5,
    y: Math.floor(bl.y) + 1.02,
    z: Math.floor(bl.z) + 0.5,
  });
  var s = getstuff(e);
  fromstring1(e, it.getDynamicProperty("inv"));
  var fs = it.getDynamicProperty("fuel");
  if (fs) {
    var pp = ("" + fs).split(",");
    for (var i = 0; i < s.fuel.length && i < pp.length; i++)
      s.fuel[i] = parseInt(pp[i]) || 0;
  }
  var h = it.getDynamicProperty("hp");
  if (h !== void 0) sethp2(e, h);
  if (k == "bamboo_bee") {
    var a = it.getDynamicProperty("cps"),
      b = it.getDynamicProperty("cfg");
    if (a) s.cps = JSON.parse(a);
    if (b) s.cfg = JSON.parse(b);
  }
  if (k == "redstone_sheep")
    s.home = {
      x: Math.floor(bl.x),
      y: Math.floor(bl.y) + 1,
      z: Math.floor(bl.z),
    };
  e.setRotation({ x: 0, y: Math.round(p.getRotation().y / 90) * 90 });
  saveit(e, s);
  sd9(e, "random.anvil_land", 0.8, 1.4);
  if (!iscreative(p)) {
    var pc = p.getComponent("minecraft:inventory").container;
    pc.setItem(p.selectedSlotIndex, void 0);
  }
}
function dumpall(e) {
  var c = getinv(e);
  if (!c) return;
  for (var i = 0; i < c.size; i++) {
    var it = c.getItem(i);
    if (it) e.dimension.spawnItem(it, e.location);
    c.setItem(i, void 0);
  }
}
function dodig(e, s) {
  var yy = e.getRotation().y,
    f = dirF(yy),
    r = dirR(yy),
    l = e.location;
  var cx = l.x + f.x * -0.25,
    cy = l.y + 1.5,
    cz = l.z + f.z * -0.25;
  var list = [],
    mz = Math.max(0, s.dy);
  for (var x = -1; x <= 1; x++)
    for (var z = -mz * 2; z <= 3; z++)
      for (var y = s.dy - 1; y <= 1 + mz; y++) {
        if (s.dy < 0 && y == 2 && z == 0) continue;
        if (s.dy < 0 && y == -2 && z == 3) continue;
        list.push({
          x: Math.floor(cx + r.x * x + f.x * z),
          y: Math.floor(cy + y),
          z: Math.floor(cz + r.z * x + f.z * z),
        });
      }
  var guard = 0;
  while (list.length && s.dp > 0 && guard < 80) {
    guard++;
    var i = Math.floor(rng() * list.length),
      p = list[i];
    list.splice(i, 1);
    s.dp -= breakit(e, p);
  }
  if (s.dp < -64) s.dp = -64;
}
function fixang(a) {
  a = a % 360;
  if (a >= 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}
function getkeys(e, s) {
  var r = e.getComponent("minecraft:rideable");
  var rd = r ? r.getRiders()[0] : null;
  if (!rd || rd.typeId != "minecraft:player") {
    s.px = s.px * 0.9;
    s.pz = s.pz * 0.9;
    s.py = s.py * 0.9;
    return null;
  }
  var mv = rd.inputInfo.getMovementVector();
  var jp = rd.inputInfo.getButtonState(InputButton.Jump) == ButtonState.Pressed;
  var sn =
    rd.inputInfo.getButtonState(InputButton.Sneak) == ButtonState.Pressed;
  if (jp && sn) {
    r.ejectRiders();
    return null;
  }
  var mx = mv.x,
    mz = mv.y,
    my = (jp ? 1 : 0) - (sn ? 1 : 0);
  s.px = s.px * 0.9 + mx * 0.1;
  s.pz = s.pz * 0.9 + mz * 0.1;
  s.py = s.py * 0.9 + my * 0.1;
  setthing(e, "input_x", cl(s.px, -1, 1));
  setthing(e, "input_y", cl(s.py, -1, 1));
  setthing(e, "input_z", cl(s.pz, -1, 1));
  return { p: rd, mx, my, mz };
}
function fromstring1(e, str) {
  if (!str) return;
  var c = getinv(e);
  if (!c) return;
  var a = ("" + str).split("|");
  for (var i = 0; i < a.length && i < c.size; i++) {
    if (!a[i]) continue;
    var p = a[i].split("*"),
      id = p[0].indexOf(":") >= 0 ? p[0] : "minecraft:" + p[0];
    c.setItem(i, new ItemStack(id, parseInt(p[1]) || 1));
  }
}
function dirR(y) {
  var r = (y * Math.PI) / 180;
  return { x: Math.cos(r), y: 0, z: Math.sin(r) };
}
function samepos(a, b) {
  return a.x == b.x && a.y == b.y && a.z == b.z;
}
function sethand(p, it) {
  var eq = p.getComponent("minecraft:equippable");
  if (eq) eq.setEquipment(EquipmentSlot.Mainhand, it);
}
function sd9(e, id, v, p) {
  e.dimension.playSound(id, e.location, {
    volume: v === void 0 ? 1 : v,
    pitch: p === void 0 ? 1 : p,
  });
}
function p9(e, s) {
  return gg(zz(e), s) * doUpg(e, s);
}
function getpos(s, input) {
  var o = [];
  for (var i = 0; i < s.cps.length; i++)
    if (!!s.cps[i].i == input) o.push(s.cps[i]);
  if (s.cfg.o == 1 && o.length > 1) {
    var r = TK % o.length;
    o = o.slice(r).concat(o.slice(0, r));
  }
  return o;
}
function getcont(e, p) {
  var b = e.dimension.getBlock(p);
  if (!b) return null;
  var ic = b.getComponent("minecraft:inventory");
  return ic ? ic.container : null;
}
function boslots(k) {
  return LAY[k].bo || [];
}
function doUpg(e, s) {
  var c = getinv(e);
  if (!c) return 1;
  /*
btw if youare looking through this thinking its ai,get a life,its not. How unemployed could you possible be to look through
thousands of lines of javascript  just so you can get a mod creator,who doesnt use ai, cancelled

This code was formatted with Prettier code formatter, not AI.

I have had complaints of using ai, WELL I DO NOT So just play the fuqin mod already instead of looking through the
*/
  var v = 1,
    u = upslots(zz(e));
  for (var step = 0; step < 2; step++)
    for (var i = 0; i < u.length; i++) {
      var it = c.getItem(u[i]);
      if (!it) continue;
      var d = UPG[it.typeId];
      if (!d) continue;
      var x = d[s];
      if (x === void 0) x = 0;
      if (x > 0 && step == 1) v += x;
      else if (x < 0 && step == 0) v *= x + 1;
    }
  return v < 0 ? 0 : v;
}
function checkcrop(e, p) {
  var b = e.dimension.getBlock(p);
  if (!b) return 0;
  var d = CROPS[b.typeId];
  if (!d) return 0;
  var g = b.permutation.getState(d[0]);
  if (g === void 0) return 0;
  return g >= d[1] ? 1 : 2;
}
function dirF(y) {
  var r = (y * Math.PI) / 180;
  return { x: -Math.sin(r), y: 0, z: Math.cos(r) };
}
function canfit(bc, it) {
  var n = it.amount;
  for (var i = 0; i < bc.size; i++) {
    var o = bc.getItem(i);
    if (!o) n -= it.maxAmount;
    else if (o.typeId == it.typeId) n -= o.maxAmount - o.amount;
    if (n <= 0) return true;
  }
  return false;
}
function cgslots(k) {
  return makelist(0, LAY[k].cg);
}
function domove(e, s, vx, vz, ph, vy, useY) {
  var v = e.getVelocity();
  var tx = v.x * ph.dec * ph.hd + vx,
    tz = v.z * ph.dec * ph.hd + vz;
  var iy = useY ? v.y * ph.dec * ph.vd + vy - v.y : 0;
  e.applyImpulse({ x: tx - v.x, y: iy, z: tz - v.z });
}
function cutit(e, s, p) {
  var b = e.dimension.getBlock(p);
  if (!b) return;
  var d = CROPS[b.typeId];
  if (!d) return;
  var perm = b.permutation;
  try {
    e.dimension.runCommand(
      "setblock " + p.x + " " + p.y + " " + p.z + " air destroy",
    );
  } catch (x) {
    return;
  }
  e.dimension.setBlockPermutation(p, perm.withState(d[0], 0));
  suck(e, p, 2);
  et2(s, C.fph);
  pt9(e, "immersive:harvest_spark", {
    x: p.x + 0.5,
    y: p.y + 0.4,
    z: p.z + 0.5,
  });
  e.dimension.playSound(
    "game.player.attack.strong",
    { x: p.x + 0.5, y: p.y + 0.5, z: p.z + 0.5 },
    { volume: 1, pitch: 1.2 },
  );
}
function saveit(e, s) {
  e.setDynamicProperty("fuel", s.fuel.join(","));
  e.setDynamicProperty("don", s.don ? 1 : 0);
  if (s.home)
    e.setDynamicProperty("home", s.home.x + "," + s.home.y + "," + s.home.z);
  if (s.k == "bamboo_bee") {
    e.setDynamicProperty("cps", JSON.stringify(s.cps));
    e.setDynamicProperty("cfg", JSON.stringify(s.cfg));
  }
}
function ping(e, s) {
  if (s.son > 0) return false;
  s.son = 60;
  sd9(e, "immersive.sonar", 1, 1);
  pt9(e, "immersive:sonar_ping", upby(e, 0.6));
  var rr = e.getComponent("minecraft:rideable"),
    rs = rr ? rr.getRiders() : [];
  var got = e.dimension.getEntities({
    location: e.location,
    maxDistance: 48,
    excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
  });
  var pts = [];
  for (var i = 0; i < got.length; i++) {
    if (got[i].id == e.id) continue;
    var sk = false;
    for (var j = 0; j < rs.length; j++) if (rs[j].id == got[i].id) sk = true;
    if (sk) continue;
    pts.push({
      x: got[i].location.x,
      y: got[i].location.y + 0.8,
      z: got[i].location.z,
    });
  }
  var d = e.dimension,
    n = 0;
  var h = SY.runInterval(function () {
    for (var i2 = 0; i2 < pts.length; i2++)
      d.spawnParticle("immersive:sonar_ping", pts[i2]);
    n++;
    if (n > 5) SY.clearRun(h);
  }, 5);
  return true;
}
function et2(s, c2) {
  while (c2 > 0 && (c2 >= 1 || rng() < c2)) {
    for (var i = 0; i < s.fuel.length; i++) if (s.fuel[i] > 0) s.fuel[i]--;
    c2 -= 1;
  }
}
function setpos2(p, it, b) {
  var ic = b.getComponent("minecraft:inventory");
  if (!ic) {
    it.setDynamicProperty("cps", "[]");
    it.setLore(["§7Sneak + use on a container to add it"]);
    sethand(p, it);
    p.onScreenDisplay.setActionBar({
      translate: "immersive.gui.bamboo_bee.positions_cleared",
    });
    return;
  }
  var list = JSON.parse(it.getDynamicProperty("cps") || "[]");
  var pos = { x: b.location.x, y: b.location.y, z: b.location.z };
  var at = -1;
  for (var i = 0; i < list.length; i++) if (samepos(list[i].p, pos)) at = i;
  if (at < 0) {
    list.push({ p: pos, n: capit2(b.typeId), i: 1 });
    p.onScreenDisplay.setActionBar({
      translate: "immersive.gui.bamboo_bee.position_input",
    });
  } else if (list[at].i) {
    list[at].i = 0;
    p.onScreenDisplay.setActionBar({
      translate: "immersive.gui.bamboo_bee.position_output",
    });
  } else {
    list.splice(at, 1);
    p.onScreenDisplay.setActionBar({
      translate: "immersive.gui.bamboo_bee.position_removed",
    });
  }
  it.setDynamicProperty("cps", JSON.stringify(list));
  var t = "";
  for (var j = 0; j < list.length; j++)
    t += (list[j].i ? "§a-> " : "§b<- ") + list[j].n + "  ";
  it.setLore(
    list.length
      ? ["§7" + list.length + " containers", t.trim()]
      : ["§7Sneak + use on a container to add it"],
  );
  sethand(p, it);
  p.dimension.playSound("random.orb", b.location, { volume: 0.4, pitch: 1.6 });
}
function target1(e, s, t) {
  if (u1(s) > 0 || t == 0) {
    if (u1(s) > 0 && s.tgt == 0 && t > 0 && SEAT[s.k])
      sd9(e, "random.click", 0.8, 0.6);
    s.tgt = t;
  }
}
function dofuel(e, s) {
  var c = getinv(e);
  if (!c) return;
  var bs = boslots(s.k);
  for (var i = 0; i < s.fuel.length; i++) {
    var guard = 0;
    while (s.fuel[i] <= 1e3 && guard < 64) {
      guard++;
      var it = c.getItem(bs[i]);
      if (!it) break;
      var t = fuelnum(it.typeId);
      if (t <= 0) break;
      s.fuel[i] += t;
      if (it.amount > 1) {
        it.amount = it.amount - 1;
        c.setItem(bs[i], it);
      } else if (it.typeId == "minecraft:lava_bucket")
        c.setItem(bs[i], new ItemStack("minecraft:bucket", 1));
      else c.setItem(bs[i], void 0);
    }
  }
}
function dd1(e, k, d) {
  var v = e.getDynamicProperty(k);
  return v === void 0 ? d : v;
}
function capit2(id) {
  return capit(id.slice(id.indexOf(":") + 1));
}
function pwr(s) {
  return s.epv * Math.sqrt(u1(s));
}
function toitem(e, s) {
  var it = new ItemStack("immersive:" + s.k, 1);
  it.setDynamicProperty("inv", tostring1(e));
  it.setDynamicProperty("fuel", s.fuel.join(","));
  it.setDynamicProperty("hp", h9(e));
  if (s.k == "bamboo_bee") {
    it.setDynamicProperty("cps", JSON.stringify(s.cps));
    it.setDynamicProperty("cfg", JSON.stringify(s.cfg));
  }
  if (s.home)
    it.setDynamicProperty("home", s.home.x + "," + s.home.y + "," + s.home.z);
  setdesc(it, s.k);
  return it;
}
function stuffin(bc, it) {
  var left = it.amount;
  for (var i = 0; i < bc.size && left > 0; i++) {
    var o = bc.getItem(i);
    if (o && o.typeId == it.typeId && o.amount < o.maxAmount) {
      var a = Math.min(left, o.maxAmount - o.amount);
      o.amount = o.amount + a;
      bc.setItem(i, o);
      left -= a;
    } else if (!o) {
      var put = Math.min(left, it.maxAmount);
      bc.setItem(i, new ItemStack(it.typeId, put));
      left -= put;
    }
  }
  if (left <= 0) return null;
  return new ItemStack(it.typeId, left);
}
function swapit(p, e, si) {
  var c = getinv(e),
    there = c.getItem(si),
    h = gethand(p),
    s = getstuff(e);
  if (h && !canput(s.k, si, h)) {
    p.onScreenDisplay.setActionBar({
      translate: "immersive.msg.wrong_slot",
      with: [capit2(h.typeId)],
    });
    return;
  }
  c.setItem(si, h ? h : void 0);
  sethand(p, there ? there : void 0);
}
function slotname(it) {
  return it ? "§f" + capit2(it.typeId) + " §7x" + it.amount : "§8empty";
}
function wkslots(k) {
  return LAY[k].wk || [];
}
function sethp2(e, f) {
  var h = e.getComponent("minecraft:health");
  if (h) h.setCurrentValue(cl(f, 0.001, 1) * h.defaultValue);
}
function sv9(s) {
  return {
    x: (s.lx - s.l2x) / 10,
    y: (s.ly - s.l2y) / 10,
    z: (s.lz - s.l2z) / 10,
  };
}
function tostring1(e) {
  var c = getinv(e);
  if (!c) return "";
  var o = [];
  for (var i = 0; i < c.size; i++) {
    var it = c.getItem(i);
    if (!it) {
      o.push("");
      continue;
    }
    o.push(it.typeId.replace("minecraft:", "") + "*" + it.amount);
  }
  while (o.length && o[o.length - 1] == "") o.pop();
  return o.join("|");
}
function iswet(e) {
  var b = getblk(
    e.dimension,
    e.location.x,
    e.location.y + box(e)[1] * 0.85,
    e.location.z,
  );
  return b ? b.typeId.indexOf("water") >= 0 : false;
}
function doBee(e, s) {
  var ph = dophys(e, s);
  target1(e, s, s.task ? 1 : 0);
  var c = getinv(e),
    carry = c.getItem(0);
  setthing(e, "cargo", carry ? true : false);
  var moved = false;
  if (!s.task) {
    s.cd--;
    if (s.cd <= 0) {
      s.task = getjob(e, s);
      if (!s.task) s.cd = 60;
    }
  } else if (!carry) {
    moved = true;
    if (flyto(e, s, s.task.s, 0.6 + box(e)[0] / 2)) {
      var bc = getcont(e, s.task.s);
      if (!bc) {
        saystuff(e, "Container gone!");
        s.task = null;
      } else {
        var it = bc.getItem(s.task.i);
        if (it && issame2(s, it, s.task.st)) {
          bc.setItem(s.task.i, void 0);
          c.setItem(0, it);
          sd9(e, "random.chestopen", 0.6, 1.4);
        } else {
          saystuff(e, "Item mismatches!");
          s.task = null;
        }
      }
    }
  } else if (issame2(s, carry, s.task.st)) {
    moved = true;
    if (flyto(e, s, s.task.t, 0.6 + box(e)[0] / 2)) {
      var bc2 = getcont(e, s.task.t);
      if (!bc2) {
        saystuff(e, "Container gone!");
        s.task = null;
      } else {
        var left = stuffin(bc2, carry);
        sd9(e, "random.chestclosed", 0.6, 1.4);
        if (!left) {
          c.setItem(0, void 0);
          s.task = null;
        } else {
          c.setItem(0, left);
          s.task = { s: s.task.s, i: s.task.i, st: left, t: s.task.s };
        }
      }
    }
  } else {
    saystuff(e, "Wrong item, returning to source!");
    s.task = { s: s.task.s, i: s.task.i, st: carry, t: s.task.s };
  }
  if (!moved) domove(e, s, 0, 0, ph, 0, false);
  var dx = s.lx - s.l2x,
    dy = s.ly - s.l2y,
    dz = s.lz - s.l2z,
    d2 = dx * dx + dy * dy + dz * dz;
  var rot = e.getRotation();
  if (d2 > 1e-5 && d2 < 10) {
    var ny = movang(rot.y, (Math.atan2(dz, dx) * 180) / Math.PI - 90, 8);
    e.setRotation({ x: 0, y: ny });
    setthing(e, "input_y", cl(dy * 4.5, -1, 1));
    setthing(e, "input_x", cl(fixang(ny - rot.y) * 0.25, -1, 1));
    if (TK % 4 == 0) pt9(e, "immersive:exhaust_smoke", upby(e, 0.4));
  } else {
    setthing(e, "input_y", 0);
    setthing(e, "input_x", 0);
  }
}
SY.beforeEvents.startup.subscribe(function (ev) {
  ev.itemComponentRegistry.registerCustomComponent("immersive:machine_item", {
    onUseOn: function (d) {
      var p = d.source,
        it = d.itemStack,
        b = d.block;
      if (!p || !it || !b) return;
      var k = it.typeId.slice(it.typeId.indexOf(":") + 1);
      if (k == "bamboo_bee" && p.isSneaking) {
        SY.run(function () {
          setpos2(p, it, b);
        });
        return;
      }
      SY.run(function () {
        putdown(p, it, b.location, k);
      });
    },
  });
});
SY.beforeEvents.startup.subscribe(function (ev) {
  ev.customCommandRegistry.registerCommand(
    {
      name: "im:im",
      description: "Immersive Machinery control panel",
      permissionLevel: 0,
      cheatsRequired: false,
    },
    function (o) {
      var p = o.sourceEntity;
      if (!p || p.typeId != "minecraft:player") return { status: 1 };
      SY.run(function () {
        var e = closest(p);
        if (!e) {
          p.onScreenDisplay.setActionBar("§cno machine nearby");
          return;
        }
        showmenu(p, e);
      });
      return { status: 0 };
    },
  );
});
W.beforeEvents.playerInteractWithEntity.subscribe(function (ev) {
  var e = ev.target,
    p = ev.player;
  if (!e || e.typeId.indexOf("immersive:") != 0) return;
  if (THINGS.indexOf(zz(e)) < 0) return;
  var it = ev.itemStack;
  if (it && it.typeId == "immersive:" + zz(e)) {
    ev.cancel = true;
    SY.run(function () {
      if (h9(e) < 1) {
        sethp2(e, h9(e) + C.rspeed);
        sd9(e, "random.anvil_use", 0.7, 1.4);
        p.onScreenDisplay.setActionBar("§a" + Math.round(h9(e) * 100) + "%");
      } else showmenu(p, e);
    });
    return;
  }
  if (p.isSneaking || !SEAT[zz(e)]) {
    ev.cancel = true;
    SY.run(function () {
      showmenu(p, e);
    });
  }
});
W.afterEvents.itemUse.subscribe(function (ev) {
  var p = ev.source;
  if (!PL[p.id]) return;
  var v = p.getComponent("minecraft:riding");
  if (!v || !v.entityRidingOn) return;
  var e = v.entityRidingOn;
  if (e.typeId.indexOf("immersive:") != 0) return;
  var s = getstuff(e);
  if (s.k == "copperfin") {
    if (!ping(e, s))
      p.onScreenDisplay.setActionBar({
        translate: "immersive.msg.sonar_cooldown",
      });
  } else if (s.k == "tunnel_digger") {
    s.don = s.don ? 0 : 1;
    p.onScreenDisplay.setActionBar({
      translate: s.don
        ? "immersive.tunnel_digger.drill_on"
        : "immersive.tunnel_digger.drill_off",
    });
    saveit(e, s);
  }
});
W.afterEvents.entityHurt.subscribe(function (ev) {
  var e = ev.hurtEntity;
  if (!e || e.typeId.indexOf("immersive:") != 0) return;
  if (THINGS.indexOf(zz(e)) < 0) return;
  var src = ev.damageSource.damagingEntity;
  if (src && src.typeId == "minecraft:player" && iscreative(src)) {
    var s = getstuff(e);
    var pc = src.getComponent("minecraft:inventory").container;
    var it = toitem(e, s);
    if (pc.emptySlotsCount > 0) pc.addItem(it);
    else e.dimension.spawnItem(it, e.location);
    delete M[e.id];
    e.remove();
  }
});
W.afterEvents.entityDie.subscribe(function (ev) {
  var e = ev.deadEntity;
  if (!e || e.typeId.indexOf("immersive:") != 0) return;
  var k = zz(e);
  if (THINGS.indexOf(k) < 0) return;
  var l = e.location,
    d = e.dimension;
  dumpall(e);
  if (C.dropit) {
    var it = new ItemStack("immersive:" + k, 1);
    setdesc(it, k);
    d.spawnItem(it, l);
  }
  if (C.boom && (k == "tunnel_digger" || k == "copperfin"))
    d.createExplosion(l, C.boomr, {
      breaksBlocks: !!C.boomblk,
      causesFire: !!C.boomfire,
    });
  delete M[e.id];
});
W.afterEvents.playerSpawn.subscribe(function (ev) {
  ev.player.inputPermissions.setPermissionCategory(
    InputPermissionCategory.Dismount,
    true,
  );
  delete PL[ev.player.id];
});
SY.runInterval(function () {
  var pl = W.getAllPlayers();
  for (var i = 0; i < pl.length; i++) {
    var h = gethand(pl[i]);
    if (!h || h.typeId.indexOf("immersive:") != 0) continue;
    var k = h.typeId.slice(10);
    if (THINGS.indexOf(k) < 0) continue;
    var lo = h.getLore();
    if (lo && lo.length) continue;
    setdesc(h, k);
    sethand(pl[i], h);
  }
}, 40);
SY.runInterval(everytick, 1);
console.warn(
  "[Immersive Machinery] bedrock port loaded - 4 machines, 8 items, 8 recipes, 5 particles",
);
