
var data;
$(function () {

    var url = "/assets/css/style.json", 
        rawCssURL = "../assets/css/style.css";
    ugData.get(url).done(function (d) {
        data = d;

        // size
        size = d.humanizedSize;
        gzipSize = d.humanizedGzipSize;
        $("#size").html(size);
        $("#gzipSize").html(gzipSize);

        // overview
        var rulesTotal = ugUtil.comma(d.rules.total),
            selectorsTotal = ugUtil.comma(d.selectors.total),
            declarationsTotal = ugUtil.comma(d.declarations.total);

        // properties
        var properties = d.declarations.properties,
            propertiesLen = 0
        $.each(properties, function (i, o) {
            //console.log(i);
            propertiesLen += 1;
        });

        $("#rules-total").html(rulesTotal);
        $("#selectors-total").html(selectorsTotal);
        $("#declarations-total").html(declarationsTotal);
        $("#properties-total").html(propertiesLen);

        var idTotal = ugUtil.comma(d.selectors.id),
            classTotal = ugUtil.comma(d.selectors.class),
            pseudoClassTotal = ugUtil.comma(d.selectors.pseudoClass),
            pseudoElementTotal = ugUtil.comma(d.selectors.pseudoElement);

        $("#id-total").html(idTotal);
        $("#class-total").html(classTotal);
        $("#pseudo-class-total").html(pseudoClassTotal);
        $("#pseudo-element-total").html(pseudoElementTotal);

        var propertiesList = d.declarations.properties;

        // LAYOUT AND STRUCTURE
        
        var displayCnt = !!propertiesList['display'] ?  propertiesList['display'].length : 0;
            floatCnt = !!propertiesList['float'] ?  propertiesList['float'].length : 0;
            widthCnt = !!propertiesList['width'] ?  propertiesList['width'].length : 0;
            heightCnt = !!propertiesList['height'] ?  propertiesList['height'].length : 0;
            maxWidthCnt = !!propertiesList['max-width'] ?  propertiesList['max-width'].length : 0;
            minWidthCnt = !!propertiesList['min-width'] ?  propertiesList['min-width'].length : 0;
            maxHeightCnt = !!propertiesList['max-height'] ?  propertiesList['max-height'].length : 0;
            minHeightCnt = !!propertiesList['min-height'] ?  propertiesList['min-height'].length : 0;

        $("#display-cnt").html(displayCnt);
        $("#float-cnt").html(floatCnt);
        $("#width-cnt").html(widthCnt);
        $("#width-cnt").html(heightCnt);
        $("#height-cnt").html(widthCnt);
        $("#max-width-cnt").html(maxWidthCnt);
        $("#min-width-cnt").html(minWidthCnt);
        $("#max-height-cnt").html(maxHeightCnt);
        $("#min-height-cnt").html(minHeightCnt);

        // SPACING
        var paddingCnt = !!propertiesList['padding'] ?  propertiesList['padding'].length : 0;
            paddingLeftCnt = !!propertiesList['padding-left'] ?  propertiesList['padding-left'].length : 0;
            paddingRightCnt = !!propertiesList['padding-right'] ?  propertiesList['padding-right'].length : 0;
            paddindTopCnt = !!propertiesList['padding-top'] ?  propertiesList['padding-top'].length : 0;
            paddingBottomCnt = !!propertiesList['padding-bottom'] ?  propertiesList['padding-bottom'].length : 0;
            marginCnt = !!propertiesList['margin'] ?  propertiesList['margin'].length : 0;
            marginLeftCnt = !!propertiesList['margin-left'] ?  propertiesList['margin-left'].length : 0;
            marginRightCnt = !!propertiesList['margin-right'] ?  propertiesList['margin-right'].length : 0;
            marginTopCnt = !!propertiesList['margin-top'] ?  propertiesList['margin-top'].length : 0;
            marginBottomCnt = !!propertiesList['margin-bottom'] ?  propertiesList['margin-bottom'].length : 0;

        $("#padding-cnt").html(paddingCnt);
        $("#padding-left-cnt").html(paddingLeftCnt);
        $("#padding-right-cnt").html(paddingRightCnt);
        $("#padding-top-cnt").html(paddindTopCnt);
        $("#padding-bottom-cnt").html(paddingBottomCnt);
        $("#margin-cnt").html(marginCnt);
        $("#margin-left-cnt").html(marginLeftCnt);
        $("#margin-right-cnt").html(marginRightCnt);
        $("#margin-top-cnt").html(marginTopCnt);
        $("#margin-bottom-cnt").html(marginBottomCnt);

        // SKIN
        var colorCnt = !!propertiesList['color'] ?  propertiesList['color'].length : 0;
            backgroundColorCnt = !!propertiesList['background-color'] ?  propertiesList['background-color'].length : 0;
            borderColorCnt = !!propertiesList['border-color'] ?  propertiesList['border-color'].length : 0;
            boxShadowCnt = !!propertiesList['box-shadow'] ?  propertiesList['box-shadow'].length : 0;

        $("#color-cnt").html(colorCnt);
        $("#background-color-cnt").html(backgroundColorCnt);
        $("#border-color-cnt").html(borderColorCnt);
        $("#box-shadow-cnt").html(boxShadowCnt);

        //console.log(propertiesList);

        // TYPOGRAPHY
        var fontfamilyCnt = !!propertiesList['font-size'] ?  propertiesList['font-size'].length : 0;
            fontsizeCnt = !!propertiesList['font-size'] ?  propertiesList['font-size'].length : 0;
            fontweightCnt = !!propertiesList['font-weight'] ?  propertiesList['font-weight'].length : 0;
            textAlignCnt = !!propertiesList['text-align'] ?  propertiesList['text-align'].length : 0;
            lineHeightCnt = !!propertiesList['line-height'] ?  propertiesList['line-height'].length : 0;
            letterSpacingCnt = !!propertiesList['letter-spacing'] ?  propertiesList['letter-spacing'].length : 0;
            textDecorationCnt = !!propertiesList['text-decoration'] ?  propertiesList['text-decoration'].length : 0;
            textShadowCnt = !!propertiesList['text-shadow'] ?  propertiesList['text-shadow'].length : 0;

        $("#font-family-cnt").html(fontfamilyCnt);
        $("#font-size-cnt").html(fontsizeCnt);
        $("#font-weight-cnt").html(fontweightCnt);
        $("#text-align-cnt").html(textAlignCnt);
        $("#line-height-cnt").html(lineHeightCnt);
        $("#letter-spacing-cnt").html(letterSpacingCnt);
        $("#text-decoration-cnt").html(textDecorationCnt);
        $("#text-shadow-cnt").html(textShadowCnt);

        // BORDER
        var borderCnt = propertiesList['border'].length,
            borderWidthCnt = propertiesList['border-width'].length,
            borderStyleCnt = propertiesList['border-style'].length,
            borderRadiusCnt = propertiesList['border-radius'].length,
            boxShadowCnt = propertiesList['box-shadow'].length;

        $("#border-cnt").html(borderCnt);
        $("#border-width-cnt").html(borderWidthCnt);
        $("#border-style-cnt").html(borderStyleCnt);
        $("#border-radius-cnt").html(borderRadiusCnt);
        $("#box-shadow-cnt").html(boxShadowCnt);


        // COLOR
        var colorList = propertiesList['color'],
            colorListObj = new Array();
        $.each(colorList, function (i, o) {
            colorListObj.push(o);
        });
        var colorUnique = new Set(colorListObj);
        colorUniqueList = [...colorUnique];
        var colorListHTML = "",
            colorLiHTML = "";
        $.each(colorUniqueList, function (i, o) {
            colorLiHTML += '<li><div class="color-preview-box" style="color:' + o + '">Aa</div><span class="color-code">' + o + '</span></li>';
        });
        colorListHTML = '<ul class="color-list">' + colorLiHTML + '</ul>';
        $("#unique-color-cnt").html(colorUniqueList.length);
        $("#color-list-box").html(colorListHTML);

        // BACKGROUND-COLOR
        var bgColorList = propertiesList['background-color'],
            bgColorListObj = new Array();
        $.each(bgColorList, function (i, o) {
            bgColorListObj.push(o);
        });
        var bgColorUnique = new Set(bgColorListObj);
        bgColorUniqueList = [...bgColorUnique];
        //console.log(bgColorUniqueList);
        var bgcolorListHTML = "",
            bgcolorLiHTML = "";
        $.each(bgColorUniqueList, function (i, o) {
            bgcolorLiHTML += '<li><div class="bgcolor-preview-box" style="background-color:' + o + '"></div><span class="bgcolor-code">' + o + '</span></li>';
        });
        bgcolorListHTML = '<ul class="bgcolor-list">' + bgcolorLiHTML + '</ul>';
        $("#unique-bgcolor-cnt").html(bgColorUniqueList.length);
        $("#bgcolor-list-box").html(bgcolorListHTML);

        var totalBgColorHTML = "",
            totalBgColorTdHTML = "";
        $.each(bgColorList, function (i, o) {
            //console.log(o);
            totalBgColorTdHTML += '<td style="background-color:' + o + '"></td>';
        });
        totalBgColorHTML = "<table><tbody><tr>" + totalBgColorTdHTML + "</tr></tbody></table>";
        $("#total-bgcolor-cnt").html(bgColorList.length);
        $("#total-bgcolor-list").html(totalBgColorHTML);


        // typography
        // font-size
        var fontSizeList = propertiesList['font-size'],
            fontSizeListObj = new Array();
        $.each(fontSizeList, function (i, o) {
            fontSizeListObj.push(o);
        });
        var fontSizeUnique = new Set(fontSizeListObj);
        var fontSizeUniqueList = [...fontSizeUnique];
        var fontSizeUniquCnt = fontSizeUniqueList.length;
        $("#fontsize-unique-cnt").html(fontSizeUniquCnt);
        var fontSizeLiHTML = "";
        $.each(fontSizeUniqueList.sort(), function (i, o) {
            fontSizeLiHTML += '<li><span>' + o + '</span><span style="font-size:' + o + '">こんにちは</span></li>';
        });
        $("#fontsize-example-box").html('<ul>' + fontSizeLiHTML + '</ul>');

        // font-family
        //$("#fontfamily-example-box").

        var fontFamilyList = propertiesList['font-family'],
            fontfamilyLiHTML = "";
        $("#fontfamily-unique-cnt").html(fontFamilyList.length);
        $.each(fontFamilyList, function (i, o) {
            fontfamilyLiHTML += '<li>' + o + '</li>';
        });
        $("#fontfamily-example-box").html('<ul>' + fontfamilyLiHTML + '</ul>');

        // spacing reset
        var paddingObj = propertiesList.padding,
            paddingLeftObj = propertiesList['padding-left'],
            paddingRightObj = propertiesList['padding-right'],
            paddindTopObj = propertiesList['padding-top'],
            paddingBottomObj = propertiesList['padding-bottom'],
            marginObj = propertiesList.margin,
            marginLeftObj = propertiesList['margin-left'],
            marginRightObj = propertiesList['margin-right'],
            marginTopObj = propertiesList['margin-top'],
            marginBottomObj = propertiesList['margin-bottom'];

        $("#padding-reset-cnt").html(returnJsonValueCnt(paddingObj));
        $("#padding-left-reset-cnt").html(returnJsonValueCnt(paddingLeftObj));
        $("#padding-right-reset-cnt").html(returnJsonValueCnt(paddingRightObj));
        $("#padding-top-reset-cnt").html(returnJsonValueCnt(paddindTopObj));
        $("#padding-bottom-reset-cnt").html(returnJsonValueCnt(paddingBottomObj));
        $("#margin-reset-cnt").html(returnJsonValueCnt(marginObj));
        $("#margin-left-reset-cnt").html(returnJsonValueCnt(marginLeftObj));
        $("#margin-right-reset-cnt").html(returnJsonValueCnt(marginRightObj));
        $("#margin-top-reset-cnt").html(returnJsonValueCnt(marginTopObj));
        $("#margin-bottom-reset-cnt").html(returnJsonValueCnt(marginBottomObj));

        // z-index
        // console.log(propertiesList['z-index']);
        var zindexList = propertiesList['z-index'],
            zindexListObj = new Array();
        $.each(zindexList, function (i, o) {
            zindexListObj.push(o);
        });
        var zindexUnique = new Set(zindexListObj);
        zindexUniqueList = [...zindexUnique];
        $("#unique-zindex-cnt").html(zindexUniqueList.length);
        $("#total-zindex-cnt").html(zindexList.length);

        var zindexLiHTML = "";
        $.each(zindexUniqueList, function (i, o) {
            // console.log(o);
            zindexLiHTML += '<li>' + o + '</li>';
        });
        $("#zindex-box").html('<ul>' + zindexLiHTML + '</ul>');

        // specificity
        var specificity = d.selectors.specificity;
        $("#average-score").html(Math.round(specificity.average));
        $("#max-score").html(Math.round(specificity.max));

        // rules graph data gen
        var widthPer = $("#ruleset-size-graph").width() / d.rules.total;
        var rulesDataList = d.rules.size.graph;

        // 최대값 구하기
        var rulesMax = (Math.max(...rulesDataList));
        var rulesMax = (d.rules.size.max);

        $("#ruleset-size-graph .graph-y").empty().html('<div><span>' + rulesMax + '</span></div><div><span>' + Math.round(rulesMax * 0.75) + '</span></div><div><span>' + Math.round(rulesMax * 0.5) + '</span></div><div><span>' + Math.round(rulesMax * 0.25) + '</span></div>');

        var rulesGraphHTML = "",
            heightPer = 0;
        $.each(rulesDataList, function (i, o) {
            heightPer = (o / rulesMax) * 100;
            leftPer = widthPer * i;
            rulesGraphHTML += '<span style="left:' + leftPer + 'px;width:' + widthPer + '%;height:' + heightPer + '%"></span>';
        });
        $("#ruleset-size-graph .graph-body").empty().html(rulesGraphHTML);

        // layout and structure graph
        $("#total-declarations-cnt").html(ugUtil.comma(d.declarations.total));
        $("#unique-declarations-cnt").html(ugUtil.comma(d.declarations.unique));

        structureValObj = new Array();
        structureValObj.push(ugUtil.uncomma($("#display-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#float-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#width-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#height-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#max-width-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#min-width-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#max-height-cnt").text()));
        structureValObj.push(ugUtil.uncomma($("#min-height-cnt").text()));

        var structureValMax = (Math.max(...structureValObj));
        $("#layout-structure-graph .graph-y").empty().html('<div><span>' + structureValMax + '</span></div><div><span>' + Math.round(structureValMax * 0.75) + '</span></div><div><span>' + Math.round(structureValMax * 0.5) + '</span></div><div><span>' + Math.round(structureValMax * 0.25) + '</span></div>');

        // display
        var displayTotalPer = (parseInt($("#display-cnt").text(), 10) / structureValMax) * 100,
            displayUnique = uniqueArr(propertiesList['display']),
            displayUniquePer = (displayUnique.length / structureValMax) * 100;

        $("#display-bar-box .total-declarations-bar").height(displayTotalPer + '%');
        $("#display-bar-box .unique-declarations-bar").height(displayUniquePer + '%');

        // float
        var floatTotalPer = (parseInt($("#float-cnt").text(), 10) / structureValMax) * 100,
            floatUnique = uniqueArr(propertiesList['float']),
            floatUniquePer = (floatUnique.length / structureValMax) * 100;

        $("#float-bar-box .total-declarations-bar").height(floatTotalPer + '%');
        $("#float-bar-box .unique-declarations-bar").height(floatUniquePer + '%');

        // width
        var widthTotalPer = (parseInt($("#width-cnt").text(), 10) / structureValMax) * 100,
            widthUnique = uniqueArr(propertiesList['width']),
            widthUniquePer = (widthUnique.length / structureValMax) * 100;

        $("#width-bar-box .total-declarations-bar").height(widthTotalPer + '%');
        $("#width-bar-box .unique-declarations-bar").height(widthUniquePer + '%');

        // height
        var heightTotalPer = (parseInt($("#height-cnt").text(), 10) / structureValMax) * 100,
            heightUnique = uniqueArr(propertiesList['height']),
            heightUniquePer = (heightUnique.length / structureValMax) * 100;

        $("#height-bar-box .total-declarations-bar").height(heightTotalPer + '%');
        $("#height-bar-box .unique-declarations-bar").height(heightUniquePer + '%');

        // max-width
        var maxWidthTotalPer = (parseInt($("#max-width-cnt").text(), 10) / structureValMax) * 100,
            maxWidthUnique = uniqueArr(propertiesList['max-width']),
            maxWidthUniquePer = (maxWidthUnique.length / structureValMax) * 100;

        $("#max-width-bar-box .total-declarations-bar").height(maxWidthTotalPer + '%');
        $("#max-width-bar-box .unique-declarations-bar").height(maxWidthUniquePer + '%');

        // min-width
        var minWidthTotalPer = (parseInt($("#min-width-cnt").text(), 10) / structureValMax) * 100,
            minWidthUnique = uniqueArr(propertiesList['min-width']),
            minWidthUniquePer = (minWidthUnique.length / structureValMax) * 100;

        $("#min-width-bar-box .total-declarations-bar").height(minWidthTotalPer + '%');
        $("#min-width-bar-box .unique-declarations-bar").height(minWidthUniquePer + '%');

        // max-height
        var maxHeightTotalPer = (parseInt($("#max-height-cnt").text(), 10) / structureValMax) * 100,
            maxHeightUnique = uniqueArr(propertiesList['max-height']),
            maxHeightUniquePer = (maxHeightUnique.length / structureValMax) * 100;

        $("#max-height-bar-box .total-declarations-bar").height(maxHeightTotalPer + '%');
        $("#max-height-bar-box .unique-declarations-bar").height(maxHeightUniquePer + '%');

        // min-height
        var minHeightTotalPer = (parseInt($("#min-height-cnt").text(), 10) / structureValMax) * 100,
            minHeightUnique = uniqueArr(propertiesList['min-height']),
            minHeightUniquePer = (minHeightUnique.length / structureValMax) * 100;

        $("#min-height-bar-box .total-declarations-bar").height(minHeightTotalPer + '%');
        $("#min-height-bar-box .unique-declarations-bar").height(minHeightUniquePer + '%');

        // padding graph
        var paddingValObj = new Array();
        paddingValObj.push(ugUtil.uncomma($("#padding-cnt").text()));
        paddingValObj.push(ugUtil.uncomma($("#padding-left-cnt").text()));
        paddingValObj.push(ugUtil.uncomma($("#padding-right-cnt").text()));
        paddingValObj.push(ugUtil.uncomma($("#padding-top-cnt").text()));
        paddingValObj.push(ugUtil.uncomma($("#padding-bottom-cnt").text()));
        var paddingValMax = (Math.max(...paddingValObj));
        $("#padding-graph .graph-y").empty().html('<div><span>' + paddingValMax + '</span></div><div><span>' + Math.round(paddingValMax * 0.75) + '</span></div><div><span>' + Math.round(paddingValMax * 0.5) + '</span></div><div><span>' + Math.round(paddingValMax * 0.25) + '</span></div>');

        var paddingTotalPer = (parseInt($("#padding-cnt").text(), 10) / paddingValMax) * 100,
            paddingUnique = uniqueArr(propertiesList['padding']),
            paddingUniquePer = (paddingUnique.length / paddingValMax) * 100;

        $("#padding-bar-box .total-declarations-bar").height(paddingTotalPer + '%');
        $("#padding-bar-box .unique-declarations-bar").height(paddingUniquePer + '%');

        var paddingLeftTotalPer = (parseInt($("#padding-left-cnt").text(), 10) / paddingValMax) * 100,
            paddingLeftUnique = uniqueArr(propertiesList['padding-left']),
            paddingLeftUniquePer = (paddingLeftUnique.length / paddingValMax) * 100;

        $("#padding-left-bar-box .total-declarations-bar").height(paddingLeftTotalPer + '%');
        $("#padding-left-bar-box .unique-declarations-bar").height(paddingLeftUniquePer + '%');

        var paddingRightTotalPer = (parseInt($("#padding-right-cnt").text(), 10) / paddingValMax) * 100,
            paddingRightUnique = uniqueArr(propertiesList['padding-right']),
            paddingRightUniquePer = (paddingRightUnique.length / paddingValMax) * 100;

        $("#padding-right-bar-box .total-declarations-bar").height(paddingRightTotalPer + '%');
        $("#padding-right-bar-box .unique-declarations-bar").height(paddingRightUniquePer + '%');

        var paddingTopTotalPer = (parseInt($("#padding-top-cnt").text(), 10) / paddingValMax) * 100,
            paddingTopUnique = uniqueArr(propertiesList['padding-top']),
            paddingTopUniquePer = (paddingTopUnique.length / paddingValMax) * 100;

        $("#padding-top-bar-box .total-declarations-bar").height(paddingTopTotalPer + '%');
        $("#padding-top-bar-box .unique-declarations-bar").height(paddingTopUniquePer + '%');

        var paddingBottomTotalPer = (parseInt($("#padding-bottom-cnt").text(), 10) / paddingValMax) * 100,
            paddingBottomUnique = uniqueArr(propertiesList['padding-bottom']),
            paddingBottomUniquePer = (paddingBottomUnique.length / paddingValMax) * 100;

        $("#padding-bottom-bar-box .total-declarations-bar").height(paddingBottomTotalPer + '%');
        $("#padding-bottom-bar-box .unique-declarations-bar").height(paddingBottomUniquePer + '%');

        // margin graph
        var marginValObj = new Array();
        marginValObj.push(ugUtil.uncomma($("#margin-cnt").text()));
        marginValObj.push(ugUtil.uncomma($("#margin-left-cnt").text()));
        marginValObj.push(ugUtil.uncomma($("#margin-right-cnt").text()));
        marginValObj.push(ugUtil.uncomma($("#margin-top-cnt").text()));
        marginValObj.push(ugUtil.uncomma($("#margin-bottom-cnt").text()));
        var marginValMax = (Math.max(...marginValObj));
        $("#margin-graph .graph-y").empty().html('<div><span>' + marginValMax + '</span></div><div><span>' + Math.round(marginValMax * 0.75) + '</span></div><div><span>' + Math.round(marginValMax * 0.5) + '</span></div><div><span>' + Math.round(marginValMax * 0.25) + '</span></div>');

        var marginTotalPer = (parseInt($("#margin-cnt").text(), 10) / marginValMax) * 100,
            marginUnique = uniqueArr(propertiesList['margin']),
            marginUniquePer = (marginUnique.length / marginValMax) * 100;

        $("#margin-bar-box .total-declarations-bar").height(marginTotalPer + '%');
        $("#margin-bar-box .unique-declarations-bar").height(marginUniquePer + '%');

        var marginLeftTotalPer = (parseInt($("#margin-left-cnt").text(), 10) / marginValMax) * 100,
            marginLeftUnique = uniqueArr(propertiesList['margin-left']),
            marginLeftUniquePer = (marginLeftUnique.length / marginValMax) * 100;

        $("#margin-left-bar-box .total-declarations-bar").height(marginLeftTotalPer + '%');
        $("#margin-left-bar-box .unique-declarations-bar").height(marginLeftUniquePer + '%');

        var marginRightTotalPer = (parseInt($("#margin-right-cnt").text(), 10) / marginValMax) * 100,
            marginRightUnique = uniqueArr(propertiesList['margin-right']),
            marginRightUniquePer = (marginRightUnique.length / marginValMax) * 100;

        $("#margin-right-bar-box .total-declarations-bar").height(marginRightTotalPer + '%');
        $("#margin-right-bar-box .unique-declarations-bar").height(marginRightUniquePer + '%');

        var marginTopTotalPer = (parseInt($("#margin-top-cnt").text(), 10) / marginValMax) * 100,
            marginTopUnique = uniqueArr(propertiesList['margin-top']),
            marginTopUniquePer = (marginTopUnique.length / marginValMax) * 100;

        $("#margin-top-bar-box .total-declarations-bar").height(marginTopTotalPer + '%');
        $("#margin-top-bar-box .unique-declarations-bar").height(marginTopUniquePer + '%');

        var marginBottomTotalPer = (parseInt($("#margin-bottom-cnt").text(), 10) / marginValMax) * 100,
            marginBottomUnique = uniqueArr(propertiesList['margin-bottom']),
            marginBottomUniquePer = (marginBottomUnique.length / marginValMax) * 100;

        $("#margin-bottom-bar-box .total-declarations-bar").height(marginBottomTotalPer + '%');
        $("#margin-bottom-bar-box .unique-declarations-bar").height(marginBottomUniquePer + '%');

        // raw css
        /*ugData.getHTML(rawCssURL).done(function (d) {
            $("#raw-css").html('<div><pre>' + d + '</pre></div>');
        });*/

        // hide Loading
        ugUtil.hideLoading();
    });

    //////////////////////////////////////////

    $(".modal").off("click").on("click", function(e){
        e.preventDefault();

        var $this = $(this),
            action = $this.data("action"),
            title = $this.data("title"),
            val = $this.find("span").text();

        if(val == 0) {

        } else {
            console.log(data);
            ugUtil.htmlFixedSetting();
            var modalPopupHTML = $(".modal-wrapper").clone();
            $("body").append(modalPopupHTML);
            $(".modal-wrapper#"+title).remove();

            var dataObj, dataObjLen = 0, genHTML = "";
            if(title == "selectors") {
                dataObj = data.selectors.values;
                $.each(dataObj, function(i, o){
                    genHTML += '<li>' + o + '</li>';
                });
            } else if (title == "declarations") {
                dataObj = data.declarations.properties; 
                $.each(dataObj, function(i, o){
                    genHTML += '<li>' + i + ' (' + o.length + ')</li>';
                });
            } else if (title == "rules") {
                dataObj = data.rules.selectorByRuleSizes;
                $.each(dataObj, function(i, o){
                    genHTML += '<li>' + o.selector + ' (선언된 속성 수 : ' + o.declarations + ')</li>';
                });
            }

            dataObjLen = dataObj.length;

            $(".modal-wrapper").last().prop("id", title).find(".modal-header").html('<h2>' + title + ' (' + val + ')</h2>');
            var $modalObj = $(".modal-wrapper#" + title);
            $modalObj.off("click").on("click", function(e){
                console.log($(e.target).parents(".modal-wrapper").length);
                if($(e.target).parents(".modal-wrapper").length == 0) {
                    $modalObj.removeClass("on");
                    ugUtil.htmlUnfixedSetting();
                }
            });
            $modalObj.find(".modal-body").html('<ol>' + genHTML + '</ol>');
            $modalObj.addClass("on");
            $modalObj.find('.modal-close a').off("click").on("click", function(){
                $modalObj.removeClass("on");
                ugUtil.htmlUnfixedSetting();
            });
        }
    });
});

function returnJsonValueCnt(arr) {
    var returnObj = arr.filter(function (item) {
        return item == 0;
    });
    //console.log(returnObj);
    return returnObj.length;
}

function uniqueArr(arr) {
    var arrUniqueSet = new Set(arr),
        arrUnique = [...arrUniqueSet];

    return arrUnique;
}