export default (code: string, generateDate: Date, emailNotificationDisableLink: string) => {
    return `
        <div class="module-list previewtable ng-pristine ng-untouched ng-valid ng-scope ng-not-empty"
        ng-class="{'dragging' : isModuleDragging}" id="previewtable" data-as-sortable="$ctrl.sortableMain"
        data-ng-model="$ctrl.contents" ng-style="$ctrl.containerStyleTemp"
        style="border-width: 0px; border-style: solid; user-select: auto;">

        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item="" class="colwrap tr textOnly-module"
            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}" ng-click="$ctrl.boxClick(module, $event)"
            ng-if="isModuleShow(module.type)" ng-init="module.over = false; module.toggleCommon = false"
            style="user-select: auto;">
            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                <div ng-if="boxStyle.box.paddingEdge == true"
                    ng-include="'/templates/editor/' + module.content.type + '.html'"
                    style="position: relative; padding: 0px 5px; user-select: auto;" ng-mouseover="boxStyle.hover = true"
                    ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                    <div ng-include="'/templates/editor/text.html'" ng-repeat="item in module.content.content"
                        style="padding: 0px 15px; user-select: auto;" class="ng-scope">
                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082031 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8; user-select: auto;">
                            <div style="text-align: center; user-select: auto;"><span
                                    style="font-size: 32px; user-select: auto; font-weight: bold;">인증번호 안내</span></div>
                        </div>
                        <div class="toolbar toolbar-text text cf toolbar11082031 ng-hide" ng-show="boxStyle.toggleStyleText"
                            ng-include="includePath.toolbar" click-outside="" outside-if-not="" style="user-select: auto;">
                            <div class="field cf ng-scope" style="user-select: auto;">
                            </div>

                            <div class="td" ng-init="
                        order = ['imageOnly','textWB'];
                        boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                    " ng-style="boxStyle.box"
                                style="padding: 5px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                                <div ng-if="boxStyle.box.paddingEdge == true"
                                    ng-include="'/templates/editor/' + module.content.type + '.html'"
                                    style="position: relative; padding: 0px 5px; user-select: auto;"
                                    ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                    class="ng-scope">
                                    <div ng-include="'/templates/editor/text.html'"
                                        ng-repeat="item in module.content.content"
                                        style="padding: 0px 15px; user-select: auto;" class="ng-scope">
                                        <div ng-init="
    boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
    boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
    boxStyle.toggleStyleText = false
    " class="textarea_content content11082027 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                                            ng-style="boxStyle.text"
                                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                                            ng-paste="toolbar.paste(boxContent, $event);"
                                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; margin: 0px; text-align: left; user-select: auto;">
                                            <div style="text-align: center; font-size: 18px; user-select: auto;"><b
                                                    style="user-select: auto;">안녕하세요, 집안일 계약서입니다!</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item=""
                            class="colwrap tr textOnly-module"
                            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}"
                            ng-click="$ctrl.boxClick(module, $event)" ng-if="isModuleShow(module.type)"
                            ng-init="module.over = false; module.toggleCommon = false" style="user-select: auto;">
                            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                                <div ng-if="boxStyle.box.paddingEdge == true"
                                    ng-include="'/templates/editor/' + module.content.type + '.html'"
                                    style="position: relative; padding: 0px 5px; user-select: auto;"
                                    ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                    class="ng-scope">
                                    <div ng-include="'/templates/editor/text.html'"
                                        ng-repeat="item in module.content.content"
                                        style="padding: 0px 15px; user-select: auto;" class="ng-scope">
                                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082035 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                                            ng-style="boxStyle.text"
                                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                                            ng-paste="toolbar.paste(boxContent, $event);"
                                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8; user-select: auto;">
                                            <div style="text-align: center; user-select: auto;">아래의 <span
                                                    style="font-weight: bold; user-select: auto;">인증번호 10자리를 입력</span>하고
                                            </div>
                                            <div style="text-align: center; user-select: auto;">인증을 완료해주세요.<br
                                                    style="user-select: auto;"></div>
                                        </div>
                                        <span ng-show="!boxStyle.toggleStyleText"
                                            class="btncover text  ng-scope ng-isolate-scope"
                                            ng-click="toolbar.open(module, $event);boxStyle.toggleStyleText = true;module.content.editing = true;toolbar.textFocus($event);"
                                            btn-cover="" cover-target="module.content.content"
                                            style="width: 590px; height: 50px; top: 0px; left: 20px; user-select: auto;">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item=""
                            class="colwrap tr partition-module"
                            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}"
                            ng-click="$ctrl.boxClick(module, $event)" ng-if="isModuleShow(module.type)"
                            ng-init="module.over = false; module.toggleCommon = false" style="user-select: auto;">
                            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                                style="padding: 20px 0px 15px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                                <div ng-if="boxStyle.box.paddingEdge == true"
                                    ng-include="'/templates/editor/' + module.content.type + '.html'"
                                    style="position: relative; padding: 0px 5px; user-select: auto;"
                                    ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                    class="ng-scope">
                                    <div ng-init="module.content.style[0].toggleStyle = false"
                                        ng-class="{'partitionToggleOn':module.content.style[0].toggleStyle}"
                                        class="ng-scope" style="user-select: auto;">
                                        <div ng-style="{height: 0,	background: module.content.style[0].partition.background,	display: module.content.style[0].partition.display,	margin: module.content.style[0].partition.margin,	padding: module.content.style[0].partition.padding,	borderTopWidth: module.content.style[0].partition.borderTopWidth,	borderTopStyle: module.content.style[0].partition.borderTopStyle,	borderTopColor: module.content.style[0].partition.borderTopColor}"
                                            ng-if="module.content.style[0].box.paddingEdge == true" class="ng-scope"
                                            style="height: 0px; background: none; display: block; margin: 0px 10px; padding: 0px; border-top: 1px solid rgb(153, 153, 153); user-select: auto;">
                                        </div>
                                        <span class="btncover partition ng-isolate-scope"
                                            ng-click="toolbar.open(module, $event);campaignNew.collapseAll();module.content.style[0].toggleStyle = true;toolbar.collapseSelect()"
                                            ng-style="{
                'padding' : '5px 0'
            }" btn-cover="" cover-target="module.content.content"
                                            style="padding: 5px 0px; width: 600px; height: 0px; top: -5px; left: 15px; user-select: auto;">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item=""
                            class="colwrap tr textOnly-module"
                            ng-class="{'over' : module.over, 'editing' : module.toggleCommon}"
                            ng-click="$ctrl.boxClick(module, $event)" ng-if="isModuleShow(module.type)"
                            ng-init="module.over = false; module.toggleCommon = false" style="user-select: auto;">
                            <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                                style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                                <div ng-if="boxStyle.box.paddingEdge == true"
                                    ng-include="'/templates/editor/' + module.content.type + '.html'"
                                    style="position: relative; padding: 0px 5px; user-select: auto;"
                                    ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                    class="ng-scope">
                                    <div ng-include="'/templates/editor/text.html'"
                                        ng-repeat="item in module.content.content"
                                        style="padding: 0px 15px; user-select: auto;" class="ng-scope">
                                        <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082029 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                                            ng-style="boxStyle.text"
                                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                                            ng-paste="toolbar.paste(boxContent, $event);"
                                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; margin: 0px; text-align: left; user-select: auto;">
                                            <div style="text-align: center; user-select: auto;"><span
                                                    style="font-size: 20px; user-select: auto; font-weight: bold;">인증번호</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item=""
                                class="colwrap tr textOnly-module"
                                ng-class="{'over' : module.over, 'editing' : module.toggleCommon}"
                                ng-click="$ctrl.boxClick(module, $event)" ng-if="isModuleShow(module.type)"
                                ng-init="module.over = false; module.toggleCommon = false" style="user-select: auto;">
                                <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                                    style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                                    <div ng-if="boxStyle.box.paddingEdge == true"
                                        ng-include="'/templates/editor/' + module.content.type + '.html'"
                                        style="position: relative; padding: 0px 5px; user-select: auto;"
                                        ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                        class="ng-scope">
                                        <div ng-include="'/templates/editor/text.html'"
                                            ng-repeat="item in module.content.content"
                                            style="padding: 0px 15px; user-select: auto;" class="ng-scope">
                                            <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082033 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                                                ng-style="boxStyle.text"
                                                ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                                                ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                                                ng-paste="toolbar.paste(boxContent, $event);"
                                                ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                                                style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8; user-select: auto;">
                                                <div style="text-align: center; user-select: auto;"><span
                                                        style="font-size: 26px; font-weight: 700; user-select: auto; color: #16cbfa;">${code}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item=""
                                class="colwrap tr textOnly-module"
                                ng-class="{'over' : module.over, 'editing' : module.toggleCommon}"
                                ng-click="$ctrl.boxClick(module, $event)" ng-if="isModuleShow(module.type)"
                                ng-init="module.over = false; module.toggleCommon = false" style="user-select: auto;">
                                <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                                    style="padding: 15px 0px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px; user-select: auto;">
                                    <div ng-if="boxStyle.box.paddingEdge == true"
                                        ng-include="'/templates/editor/' + module.content.type + '.html'"
                                        style="position: relative; padding: 0px 5px; user-select: auto;"
                                        ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                        class="ng-scope">
                                        <div ng-include="'/templates/editor/text.html'"
                                            ng-repeat="item in module.content.content"
                                            style="padding: 0px 15px; user-select: auto;" class="ng-scope">
                                            <div ng-init="
            boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent; 
            boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
            boxStyle.toggleStyleText = false
        " class="textarea_content content11082034 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                                                ng-style="boxStyle.text"
                                                ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                                                ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                                                ng-paste="toolbar.paste(boxContent, $event);"
                                                ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                                                style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8; user-select: auto;">
                                                <ul style="user-select: auto;">
                                                    <li style="user-select: auto;">
                                                        <div lang="x-size-13" style="user-select: auto;"><span
                                                                style="color: rgb(143, 143, 143); font-size: 12px; user-select: auto;">${generateDate.toISOString().substr(0, 10).replace(/-/, '.')} ${generateDate.toTimeString()} 기준</span></div>
                                                    </li>
                                                    <li style="user-select: auto;">
                                                        <div lang="x-size-13" style="user-select: auto;"><span
                                                                style="color: rgb(143, 143, 143); font-size: 12px; user-select: auto;">인증번호는</span><span
                                                                style="color: rgb(143, 143, 143); font-size: 12px; user-select: auto;">&nbsp;</span><strong
                                                                style="color: rgb(143, 143, 143); font-family: inherit; font-size: 12px; font-style: inherit; user-select: auto;">이메일
                                                                발송 시점으로부터 하루동안 유효</strong><span
                                                                style="color: rgb(143, 143, 143); font-size: 12px; user-select: auto;">합니다.</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-ng-repeat="module in $ctrl.contents" data-as-sortable-item=""
                                class="colwrap tr footer-module"
                                ng-class="{'over' : module.over, 'editing' : module.toggleCommon}"
                                ng-click="$ctrl.boxClick(module, $event)" ng-if="isModuleShow(module.type)"
                                ng-init="module.over = false; module.toggleCommon = false" style="user-select: auto;">
                                <div class="td" ng-init="
                                order = ['imageOnly','textWB'];
                                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                            " ng-style="boxStyle.box"
                                    style="padding: 15px 0px; text-align: center; line-height: 1.6; border-style: solid; border-width: 0px; user-select: auto;">
                                    <div ng-if="boxStyle.box.paddingEdge == true"
                                        ng-include="'/templates/editor/' + module.content.type + '.html'"
                                        style="position: relative; padding: 0px 5px; user-select: auto;"
                                        ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false"
                                        class="ng-scope">
                                        <div style="padding: 0px 10px; user-select: auto;" class="footer_wrapper ng-scope"
                                            ng-init="
            boxContent = module.content.content[0];
        ">
                                            <div class="textarea_content footer_content content11082030 ng-not-empty"
                                                ng-model="module.content.content[0].text" contenteditable="true"
                                                ng-style="module.content.style[0].text"
                                                ng-class="{'textToggleOn' : module.content.style[0].toggleStyleText}"
                                                ng-init="module.content.style[0].toggleStyleText = false"
                                                ng-mouseup="toolbar.detect($event, module, 0, module.content.content[0].text);"
                                                ng-paste="toolbar.paste(module.content.content[0], $event);"
                                                ng-keydown="toolbar.detect($event, module, 0, module.content.content[0].text);"
                                                style="font-size: 12px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(96, 96, 96); padding: 0px; margin: 0px; text-align: center; user-select: auto;">
                                                <font color="#999999" style="user-select: auto;">집안일 계약서</font><br
                                                    style="user-select: auto;">
                                                <div style="user-select: auto;"><span
                                                        style="color: rgb(153, 153, 153); user-select: auto;">kyw017763@gmail.com</span>
                                                </div>
                                                <div style="user-select: auto;"><span
                                                        style="color: rgb(153, 153, 153); user-select: auto;"><a
                                                            href="${emailNotificationDisableLink}"
                                                            style="text-decoration: underline; color: rgb(153, 153, 153); user-select: auto;"
                                                            class=" link-edited">수신거부</a></span><b
                                                        style="user-select: auto;"></b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}