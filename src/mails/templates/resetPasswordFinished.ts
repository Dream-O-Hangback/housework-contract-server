export default (email: string, password: string, loginLink: string, emailNotificationDisableLink: string) => {
    return `
        <div class="module-list previewtable ng-pristine ng-untouched ng-valid ng-scope ng-not-empty"
        ng-class="{'dragging' : isModuleDragging}" id="previewtable" data-as-sortable="$ctrl.sortableMain"
        data-ng-model="$ctrl.contents" ng-style="$ctrl.containerStyleTemp"
        style="border-width: 0px; border-style: solid; user-select: auto; background-position: 0px 0px; padding-bottom: 0px;">

        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 5px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'" style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                        style="padding: 0 15px;" class="ng-scope">
                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082112 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; margin: 0px; text-align: left;">
                            <div style="text-align: center; font-size: 18px; user-select: auto;"><span
                                    style="font-size: 32px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); font-weight: 700; font-style: normal; text-decoration-line: none; user-select: auto;">임시
                                    비밀번호 발급 완료</span></div>
                        </div>
                        <div class="toolbar toolbar-text text cf toolbar11082112 ng-hide" ng-show="boxStyle.toggleStyleText"
                            ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                            <div class="field cf ng-scope">
                            </div>
                        </div>
                        <span ng-show="!boxStyle.toggleStyleText" class="btncover text  ng-scope ng-isolate-scope"
                            ng-click="toolbar.open(module, $event);boxStyle.toggleStyleText = true;module.content.editing = true;toolbar.textFocus($event);"
                            btn-cover="" cover-target="module.content.content"
                            style="width: 590px; height: 57px; top: 0px; left: 20px;">
                        </span>
                    </div>
                </div>
            </div>
            <div class="cover c_textOnly" ng-if="module.content.type != 'empty'">
            </div>
        </div>
        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'" style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                        style="padding: 0 15px;" class="ng-scope">
                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082114 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; margin: 0px; text-align: left;">
                            <div style="text-align: center; user-select: auto;"><span
                                    style="color: rgb(51, 51, 51); font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 700; user-select: auto;">안녕하세요,
                                    집안일 계약서입니다!</span></div>
                        </div>
                        <!-- ngInclude: includePath.toolbar -->
                        <div class="toolbar toolbar-text text cf toolbar11082114 ng-hide" ng-show="boxStyle.toggleStyleText"
                            ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                            <div class="field cf ng-scope">
                            </div>
                        </div>
                        <span ng-show="!boxStyle.toggleStyleText" class="btncover text  ng-scope ng-isolate-scope"
                            ng-click="toolbar.open(module, $event);boxStyle.toggleStyleText = true;module.content.editing = true;toolbar.textFocus($event);"
                            btn-cover="" cover-target="module.content.content"
                            style="width: 590px; height: 28px; top: 0px; left: 20px;">
                        </span>
                    </div>
                </div>
            </div>
            <div class="cover c_textOnly" ng-if="module.content.type != 'empty'">

            </div>
        </div>
        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr partition-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'" style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-init="module.content.style[0].toggleStyle = false"
                        ng-class="{'partitionToggleOn':module.content.style[0].toggleStyle}" class="ng-scope">
                        <div ng-style="{height: 0,	background: module.content.style[0].partition.background,	display: module.content.style[0].partition.display,	margin: module.content.style[0].partition.margin,	padding: module.content.style[0].partition.padding,	borderTopWidth: module.content.style[0].partition.borderTopWidth,	borderTopStyle: module.content.style[0].partition.borderTopStyle,	borderTopColor: module.content.style[0].partition.borderTopColor}"
                            ng-if="module.content.style[0].box.paddingEdge == true" class="ng-scope"
                            style="height: 0px; background: none; display: block; margin: 0px; padding: 0px; border-top: 1px solid rgb(153, 153, 153);">
                        </div>
                        <span class="btncover partition ng-isolate-scope"
                            ng-click="toolbar.open(module, $event);campaignNew.collapseAll();module.content.style[0].toggleStyle = true;toolbar.collapseSelect()"
                            ng-style="{
                'padding' : '5px 0'
            }" btn-cover="" cover-target="module.content.content"
                            style="padding: 5px 0px; width: 620px; height: 0px; top: -5px; left: 15px;">
                        </span>
                    </div>
                </div>
            </div>
            <div class="cover c_partition" ng-if="module.content.type != 'empty'">
            </div>
        </div>
        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'" style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                        style="padding: 0 15px;" class="ng-scope">
                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082119 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                            <div style="text-align: center; user-select: auto;"><span
                                    style="color: rgb(51, 51, 51); font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; font-style: normal; user-select: auto;">임시
                                    비밀번호는</span></div>
                        </div>
                        <div class="toolbar toolbar-text text cf toolbar11082119 ng-hide" ng-show="boxStyle.toggleStyleText"
                            ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                            <div class="field cf ng-scope">
                            </div>

                        </div>
                        <span ng-show="!boxStyle.toggleStyleText" class="btncover text  ng-scope ng-isolate-scope"
                            ng-click="toolbar.open(module, $event);boxStyle.toggleStyleText = true;module.content.editing = true;toolbar.textFocus($event);"
                            btn-cover="" cover-target="module.content.content"
                            style="width: 590px; height: 25px; top: 0px; left: 20px;">
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'" style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                        style="padding: 0 15px;" class="ng-scope">
                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082120 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                            <div style="text-align: center; user-select: auto;"><span
                                    style="font-size: 26px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); font-style: normal; text-decoration-line: none; user-select: auto; font-weight: bold;">${password}</span>
                            </div>
                        </div>
                        <div class="toolbar toolbar-text text cf toolbar11082120 ng-hide" ng-show="boxStyle.toggleStyleText"
                            ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                            <div class="field cf ng-scope">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'" style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                        style="padding: 0 15px;" class="ng-scope">
                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082122 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                            <div style="text-align: center; user-select: auto;"><span
                                    style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); font-weight: 400; font-style: normal; text-decoration-line: none; user-select: auto;">입니다.</span>
                            </div>
                        </div>

                    </div>
                    <span ng-show="!boxStyle.toggleStyleText" class="btncover text  ng-scope ng-isolate-scope"
                        ng-click="toolbar.open(module, $event);boxStyle.toggleStyleText = true;module.content.editing = true;toolbar.textFocus($event);"
                        btn-cover="" cover-target="module.content.content"
                        style="width: 590px; height: 25px; top: 0px; left: 20px;">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr partition-module"
        ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
        ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
        <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
            style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
            <div ng-if="boxStyle.box.paddingEdge == true" ng-include="'/templates/editor/' + module.content.type + '.html'"
                style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                <div ng-init="module.content.style[0].toggleStyle = false"
                    ng-class="{'partitionToggleOn':module.content.style[0].toggleStyle}" class="ng-scope">
                    <div ng-style="{height: 0,	background: module.content.style[0].partition.background,	display: module.content.style[0].partition.display,	margin: module.content.style[0].partition.margin,	padding: module.content.style[0].partition.padding,	borderTopWidth: module.content.style[0].partition.borderTopWidth,	borderTopStyle: module.content.style[0].partition.borderTopStyle,	borderTopColor: module.content.style[0].partition.borderTopColor}"
                        ng-if="module.content.style[0].box.paddingEdge == true" class="ng-scope"
                        style="height: 0px; background: none; display: block; margin: 0px; padding: 0px; border-top: 1px solid rgb(153, 153, 153);">
                    </div>
                    <span class="btncover partition ng-isolate-scope"
                        ng-click="toolbar.open(module, $event);campaignNew.collapseAll();module.content.style[0].toggleStyle = true;toolbar.collapseSelect()"
                        ng-style="{
                'padding' : '5px 0'
            }" btn-cover="" cover-target="module.content.content"
                        style="padding: 5px 0px; width: 620px; height: 0px; top: -5px; left: 15px;">
                    </span>
                </div>

            </div>
        </div>
    </div>
    <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
        ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
        ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
        <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
            style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
            <div ng-if="boxStyle.box.paddingEdge == true" ng-include="'/templates/editor/' + module.content.type + '.html'"
                style="
                    position:relative;
                    padding:0 5px;
                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                    style="padding: 0 15px;" class="ng-scope">
                    <div ng-init="
                            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
                            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
                            boxStyle.toggleStyleText = false
                        " class="textarea_content content11082121 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                        ng-style="boxStyle.text"
                        ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                        ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                        ng-paste="toolbar.paste(boxContent, $event);"
                        ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                        style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                        위의 임시 비밀번호를 이용하여 로그인 후 비밀번호를 변경해주세요.</div>
                    <div class="toolbar toolbar-text text cf toolbar11082121 ng-hide" ng-show="boxStyle.toggleStyleText"
                        ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                        <div class="field cf ng-scope">
                        </div>
                    </div>
                    <span ng-show="!boxStyle.toggleStyleText" class="btncover text  ng-scope ng-isolate-scope"
                        ng-click="toolbar.open(module, $event);boxStyle.toggleStyleText = true;module.content.editing = true;toolbar.textFocus($event);"
                        btn-cover="" cover-target="module.content.content"
                        style="width: 590px; height: 25px; top: 0px; left: 20px;">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr CTAOnly-module"
        ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
        ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
        <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
            style="padding: 15px 0px; text-align: center; line-height: 1.8; border-style: solid; border-width: 0px;">
            <div ng-if="boxStyle.box.paddingEdge == true" ng-include="'/templates/editor/' + module.content.type + '.html'"
                style="
                    position:relative;
                    padding:0 5px;
                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                <div ng-include="'/templates/editor/CTA.html'" ng-repeat="item in module.content.content"
                    style="padding:0 15px;position: relative" class="ng-scope">
                    <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyle = false;
            boxContent.linkMergeOpend = false;
        " ng-style="{
            padding: '10px 0',
            margin:'0 0',
            paddingLeft: '0',
            paddingRight: '0',
            'text-align' : boxStyle.button.textAlign
        }" ng-class="{'btnToggleOn':boxStyle.toggleStyle}" class="ng-scope"
                        style="padding: 10px 0px; margin: 0px; text-align: center;">
                        <p style="line-height: 1.5;">
                            <a href="${loginLink}" ng-style="boxStyle.button" target="_blank" contenteditable="true"
                                ng-paste="toolbar.pasteCta(boxContent,$event);" ng-keypress="preventBreak($event);"
                                ng-keydown="preventBreak($event);mergeTagInsert($event)" ng-model="boxContent.buttonText"
                                ng-class="{'btnLinkToggleOn':boxStyle.toggleStyle}"
                                class="cta ng-pristine ng-untouched ng-valid ng-not-empty"
                                style="font-size: 16px; color: rgb(255, 255, 255); display: inline-block; background: rgb(22, 203, 250); border-radius: 500px; border-style: solid; border-width: 0px; padding: 14px 24px 11px; text-decoration: none; outline: 0px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; text-align: center;">임시
                                비밀번호로 로그인하기</a>
                            <span ng-show="!boxStyle.toggleStyle" class="btncover cta ng-isolate-scope"
                                ng-click="toolbar.open(module, $event);boxStyle.toggleStyle = true;" btn-cover=""
                                cover-target="module.content.content"
                                style="width: 590px; height: 69px; top: 0px; left: 15px;">
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr footer-module"
        ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
        ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false">
        <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
            style="padding: 15px 0px; text-align: center; line-height: 1.6; border-style: solid; border-width: 0px;">
            <div ng-if="boxStyle.box.paddingEdge == true" ng-include="'/templates/editor/' + module.content.type + '.html'"
                style="
                                    position:relative;
                                    padding:0 5px;
                                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                <div style="padding: 0 10px;" class="footer_wrapper ng-scope" ng-init="
            boxContent = module.content.content[0];
        ">
                    <div class="textarea_content footer_content content11082118 ng-not-empty"
                        ng-model="module.content.content[0].text" contenteditable="true"
                        ng-style="module.content.style[0].text"
                        ng-class="{'textToggleOn' : module.content.style[0].toggleStyleText}"
                        ng-init="module.content.style[0].toggleStyleText = false"
                        ng-mouseup="toolbar.detect($event, module, 0, module.content.content[0].text);"
                        ng-paste="toolbar.paste(module.content.content[0], $event);"
                        ng-keydown="toolbar.detect($event, module, 0, module.content.content[0].text);"
                        style="font-size: 12px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(96, 96, 96); padding: 0px; margin: 0px; text-align: center;">
                        <span style="color: rgb(153, 153, 153); user-select: auto;">집안일 계약서</span>
                        <div style="user-select: auto;"><span
                                style="color: rgb(153, 153, 153); user-select: auto;">kyw017763@gmail.com</span></div>
                        <div style="user-select: auto;"><span style="color: rgb(153, 153, 153); user-select: auto;"><a
                                    href="${emailNotificationDisableLink}"
                                    style="text-decoration: underline; color: rgb(153, 153, 153); user-select: auto;"
                                    class=" link-edited">수신거부</a></span><b style="user-select: auto;"></b></div>
                    </div>
                    <div class="toolbar toolbar-text toolbar-footer text cf toolbar11082118 ng-hide"
                        ng-show="module.content.style[0].toggleStyleText" ng-include="includePath.toolbar" click-outside=""
                        outside-if-not="">
                        <div class="field cf ng-scope">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}