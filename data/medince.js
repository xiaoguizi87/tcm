var data = [
  {'name': '白扁豆', 'effect': '健脾化湿，和中消暑'},
  {'name': '白矾', 'effect': '外用解毒杀虫，燥湿止痒；内服止血止泻，祛除风痰'},
  {'name': '白果', 'effect': '敛肺定喘，止带缩尿'},
  {'name': '白蔹', 'effect': '清热解毒，消痈散结，敛疮生肌'},
  {'name': '白前', 'effect': '降气，消痰，止咳'},
  {'name': '白术', 'effect': '健脾益气，燥湿利水，止汗，安胎'},
  {'name': '白头翁', 'effect': '清热解毒，凉血止痢'},
  {'name': '白鲜皮', 'effect': '清热燥湿，祛风解毒'},
  {'name': '白芷', 'effect': '解表散寒，祛风止痛，宣通鼻窍，燥湿止带，消肿排脓'},
  {'name': '百部', 'effect': '润肺下气止咳，杀虫灭虱'},
  {'name': '百合', 'effect': '养阴润肺，清心安神'},
  {'name': '板蓝根', 'effect': '清热解毒，凉血利咽'},
  {'name': '薄荷', 'effect': '疏散风热，清利头目，利咽，透疹，疏肝行气'},
  {'name': '北沙参', 'effect': '养阴清肺，益胃生津'},
  {'name': '萹蓄', 'effect': '利尿通淋，杀虫，止痒'},
  {'name': '槟榔', 'effect': '杀虫，消积，行气，利水，截疟'},
  {'name': '补骨脂', 'effect': '温肾助阳，纳气平喘，温脾止泻；外用消风祛斑'},
  {'name': '苍术', 'effect': '燥湿健脾，祛风散寒，明目'},
  {'name': '草果', 'effect': '燥湿温中，截疟除痰'},
  {'name': '侧柏叶', 'effect': '凉血止血，化痰止咳，生发乌发'},
  {'name': '蝉蜕', 'effect': '疏散风热，利咽，透疹，明目退翳，解痉'},
  {'name': '川楝子', 'effect': '疏肝泄热，行气止痛，杀虫'},
  {'name': '川木通', 'effect': '利尿通淋，清心除烦，通经下乳'},
  {'name': '川芎', 'effect': '活血行气，祛风止痛'},
  {'name': '穿心莲', 'effect': '清热解毒，凉血，消肿'},
  {'name': '垂盆草', 'effect': '利湿退黄，清热解毒'},
  {'name': '大黄', 'effect': '泻热攻积，清热泻火，凉血解毒，逐瘀通经，利湿退黄'},
  {'name': '淡竹叶', 'effect': '清热泻火，除烦止渴，利尿通淋'},
  {'name': '当归', 'effect': '补血活血，调经止痛，润肠通便'},
  {'name': '党参', 'effect': '健脾益肺，养血生津'},
  {'name': '灯心草', 'effect': '清心火，利小便'},
  {'name': '地骨皮', 'effect': '凉血除蒸，清肺降火'},
  {'name': '地榆', 'effect': '凉血止血，解毒敛疮'},
  {'name': '丁香', 'effect': '温中降逆，补肾助阳'},
  {'name': '豆蔻', 'effect': '化湿行气，温中止呕，开胃消食'},
  {'name': '杜仲', 'effect': '补肝肾，强筋骨，安胎'},
  {'name': '番泻叶', 'effect': '泻热行滞，通便，利水'},
  {'name': '防风', 'effect': '祛风解表，胜湿止痛，止痉'},
  {'name': '蜂房', 'effect': '攻毒杀虫，祛风止痛'},
  {'name': '佛手', 'effect': '疏肝理气，和胃止痛，燥湿化痰'},
  {'name': '甘草', 'effect': '补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药'},
  {'name': '甘遂', 'effect': '泻水逐饮，消肿散结'},
  {'name': '高良姜', 'effect': '温胃止呕，散寒止痛'},
  {'name': '狗脊', 'effect': '祛风湿，补肝肾，强腰膝'},
  {'name': '枸杞子', 'effect': '滋补肝肾，益精明目'},
  {'name': '谷精草', 'effect': '疏散风热，明目退翳'},
  {'name': '龟甲', 'effect': '滋阴潜阳，益肾强骨，养血补心，固经止崩。'},
  {'name': '桂枝', 'effect': '发汗解肌，温通经脉，助阳化气，平冲降气'},
  {'name': '海螵蛸', 'effect': '收敛止血，涩精止带，制酸止痛，收湿敛疮'},
  {'name': '厚朴', 'effect': '燥湿消痰，下气除满'},
  {'name': '胡黄连', 'effect': '退虚热，除疳热，清湿热'},
  {'name': '胡芦巴', 'effect': '温肾助阳，祛寒止痛'},
  {'name': '槲寄生', 'effect': '祛风湿，补肝肾，强筋骨，安胎元'},
  {'name': '黄柏', 'effect': '清热燥湿，泻火除蒸，解毒疗疮'},
  {'name': '鸡冠花', 'effect': '收敛止血，止带，止痢'},
  {'name': '鸡内金', 'effect': '健胃消食，涩精止遗，通淋化石'},
  {'name': '蒺藜', 'effect': '平肝解郁，活血祛风，明目，止痒'},
  {'name': '金银花', 'effect': '清热解毒，疏散风热'},
  {'name': '锦灯笼', 'effect': '清热解毒，利咽化痰，利尿通淋'},
  {'name': '桔梗', 'effect': '宣肺，利咽，祛痰，排脓'},
  {'name': '款冬花', 'effect': '润肺下气，止咳化痰'},
  {'name': '雷丸', 'effect': '杀虫消积'},
  {'name': '连翘', 'effect': '清热解毒，消肿散结，疏散风热'},
  {'name': '硫黄', 'effect': '外用解毒杀虫疗疮；内服补火助阳通便'},
  {'name': '芦荟', 'effect': '泻下通便，清肝泻火，杀虫疗疳'},
  {'name': '鹿茸', 'effect': '壮肾阳，益精血，强筋骨，调冲任，托疮毒'},
  {'name': '罗布麻叶', 'effect': '平肝安神，清热利水'},
  {'name': '络石藤', 'effect': '祛风通络，凉血消肿'},
  {'name': '麻黄根', 'effect': '固表止汗'},
  {'name': '马鞭草', 'effect': '活血散瘀，解毒，利水，退黄，截疟'},
  {'name': '玫瑰花', 'effect': '行气解郁，和血，止痛'},
  {'name': '密蒙花', 'effect': '清热泻火，养肝明目，退翳'},
  {'name': '木香', 'effect': '行气止痛，健脾消食'},
  {'name': '木贼', 'effect': '疏散风热，明目退翳'},
  {'name': '南沙参', 'effect': '养阴清肺，益胃生津，化痰，益气'},
  {'name': '胖大海', 'effect': '清热润肺，利咽开音，润肠通便'},
  {'name': '佩兰', 'effect': '芳香化湿，醒脾开胃，发表解暑'},
  {'name': '千年健', 'effect': '祛风湿，壮筋骨'},
  {'name': '前胡', 'effect': '降气化痰，散风清热'},
  {'name': '芡实', 'effect': '益肾固精，补脾止泻，除湿止带'},
  {'name': '羌活', 'effect': '解表散寒，祛风除湿，止痛'},
  {'name': '青蒿', 'effect': '清虚热，除骨蒸，解暑热，截疟，退黄'},
  {'name': '青葙子', 'effect': '清肝泻火，明目退翳'},
  {'name': '瞿麦', 'effect': '利尿通淋，活血通经'},
  {'name': '忍冬藤', 'effect': '清热解毒，疏风通络'},
  {'name': '肉豆蔻', 'effect': '温中行气，涩肠止泻'},
  {'name': '桑枝', 'effect': '祛风湿，利关节'},
  {'name': '沙苑子', 'effect': '补肾助阳，固精缩尿，养肝明目'},
  {'name': '山药', 'effect': '补脾养胃，生津益肺，补肾涩精'},
  {'name': '蛇床子', 'effect': '燥湿祛风，杀虫止痒，温肾壮阳'},
  {'name': '伸筋草', 'effect': '祛风除湿，舒筋活络'},
  {'name': '升麻', 'effect': '发表透疹，清热解毒，升举阳气'},
  {'name': '石菖蒲', 'effect': '开窍豁痰，醒神益智，化湿开胃'},
  {'name': '石膏', 'effect': '清热泻火，除烦止渴'},
  {'name': '石决明', 'effect': '平肝潜阳，清肝明目'},
  {'name': '石韦', 'effect': '利尿通淋，清肺止咳，凉血止血'},
  {'name': '水牛角', 'effect': '清热凉血，解毒，定惊'},
  {'name': '水蛭', 'effect': '破血通经，逐瘀消癥'},
  {'name': '锁阳', 'effect': '补肾阳，益精血，润肠通便'},
  {'name': '天麻', 'effect': '息风止痉，平抑肝阳，祛风通络'},
  {'name': '葶苈子', 'effect': '泻肺平喘，行水消肿'},
  {'name': '通草', 'effect': '清热利尿，通气下乳'},
  {'name': '土鳖虫', 'effect': '破血逐瘀，续筋接骨'},
  {'name': '菟丝子', 'effect': '补益肝肾，固精缩尿，安胎，明目，止泻；外用消风祛斑'},
  {'name': '王不留行', 'effect': '活血通经，下乳消肿，利尿通淋'},
  {'name': '五倍子', 'effect': '敛肺降火，涩肠止泻，敛汗，止血，收湿敛疮'},
  {'name': '五味子', 'effect': '收敛固涩，益气生津，补肾宁心'},
  {'name': '西洋参', 'effect': '补气养阴，清热生津'},
  {'name': '细辛', 'effect': '解表散寒，祛风止痛，通窍，温肺化饮'},
  {'name': '夏枯草', 'effect': '清肝泻火，明目，散结消肿'},
  {'name': '香薷', 'effect': '发汗解表，化湿和中'},
  {'name': '薤白', 'effect': '通阳散结，行气导滞'},
  {'name': '徐长卿', 'effect': '祛风，化湿，止痛，止痒'},
  {'name': '玄参', 'effect': '清热凉血，滋阴降火，解毒散结'},
  {'name': '玄明粉', 'effect': '泻下通便，润燥软坚，清火消肿'},
  {'name': '旋覆花', 'effect': '降气，消痰，行水，止呕'},
  {'name': '血竭', 'effect': '活血定痛，化瘀止血，生肌敛疮'},
  {'name': '鸦胆子', 'effect': '清热解毒，截疟，止痢；外用腐蚀赘疣'},
  {'name': '薏苡仁', 'effect': '利水渗湿，健脾止泻，除痹，排脓，解毒散结'},
  {'name': '茵陈', 'effect': '清利湿热，利胆退黄'},
  {'name': '银柴胡', 'effect': '清虚热，除疳热'},
  {'name': '淫羊藿', 'effect': '补肾阳，强筋骨，祛风湿'},
  {'name': '郁金', 'effect': '活血止痛，行气解郁，清心凉血，利胆退黄'},
  {'name': '月季花', 'effect': '活血调经，疏肝解郁'},
  {'name': '泽兰', 'effect': '活血调经，祛瘀消痈，利水消肿'},
  {'name': '知母', 'effect': '清热泻火，滋阴润燥'},
  {'name': '枳壳', 'effect': '理气宽中，行滞消胀'},
  {'name': '紫菀', 'effect': '润肺下气，消痰止咳'}
]

module.exports = {data}
