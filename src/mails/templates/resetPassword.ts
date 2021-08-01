export default (email: string, resetPasswordLink: string, emailNotificationDisableLink: string) => {
    return `
        <div class="module-list previewtable ng-pristine ng-untouched ng-valid ng-scope ng-not-empty"
        ng-class="{'dragging' : isModuleDragging}" id="previewtable" data-as-sortable="$ctrl.sortableMain"
        data-ng-model="$ctrl.contents" ng-style="$ctrl.containerStyleTemp"
        style="user-select: auto; border-width: 0px; border-style: solid; padding-bottom: 0px; background-position: 0px 0px;">
        <div class="td" ng-init="
                order = ['imageOnly','textWB'];
                boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[0] : module.content.style[0][0];
                " ng-style="boxStyle.box"
            style="padding: 15px 0px 5px; text-align: left; line-height: 1.8; border-style: solid; border-width: 0px;">
            <div ng-if="boxStyle.box.paddingEdge == true" ng-include="'/templates/editor/' + module.content.type + '.html'"
                style="
                    position:relative;
                    padding:0 5px;
                " ng-mouseover="boxStyle.hover = true" ng-mouseleave="boxStyle.hover = false" class="ng-scope">
                <div ng-init="
                        boxContent = module.content.type.indexOf('shop') == -1 ? module.content.content[$index] : subContent;
                        boxStyle = module.content.type.indexOf('shop') == -1 ?  module.content.style[$index] : subStyle;
                        boxStyle.toggleStyleText = false
                    " class="textarea_content content11081868 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                    ng-style="boxStyle.text"
                    ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                    ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                    ng-paste="toolbar.paste(boxContent, $event);"
                    ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                    style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                    <div style="text-align: center; user-select: auto;">
                        <span
                        style="font-size: 32px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); font-weight: 700; font-style: normal; text-decoration-line: none; user-select: auto;">비밀번호
                        초기화</span>
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
                        " class="textarea_content content11082108 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                            ng-style="boxStyle.text"
                            ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                            ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                            ng-paste="toolbar.paste(boxContent, $event);"
                            ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                            style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                        <div style="text-align: center; user-select: auto;"><span
                                style="font-size: 16px; user-select: auto; font-weight: bold;">안녕하세요, 집안일 계약서입니다!</span>
                        </div>
                    </div>
                    <div class="toolbar toolbar-text text cf toolbar11082108 ng-hide" ng-show="boxStyle.toggleStyleText"
                        ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                        <div class="field cf ng-scope">
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                        " class="textarea_content content11082109 ng-not-empty" ng-model="boxContent.text" contenteditable="true"
                        ng-style="boxStyle.text"
                        ng-class="{'textToggleOn' : boxStyle.toggleStyleText, 'editing': module.toggleCommon}"
                        ng-mouseup="toolbar.detect($event, module, $index, boxContent.text);"
                        ng-paste="toolbar.paste(boxContent, $event);"
                        ng-keydown="toolbar.detect($event, module, $index, boxContent.text);mergeTagInsert($event, module);"
                        style="font-size: 14px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; color: rgb(51, 51, 51); padding: 0px; text-align: left; line-height: 1.8;">
                        <div style="text-align: center; user-select: auto;"><span
                                style="color: rgb(51, 51, 51); font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; font-style: normal; user-select: auto;">${email} 계정의 비밀번호를
                                초기화하고 싶으시다면 <span style="font-weight: bold; user-select: auto;">아래 버튼</span>을 눌러주세요.</span>
                        </div>
                        <div style="text-align: center; user-select: auto;">비밀번호 초기화 후 <span
                                style="font-weight: bold; user-select: auto;">임시 비밀번호가 담긴 이메일을 발송</span>해드립니다.</div>
                        </div>
                        <div class="toolbar toolbar-text text cf toolbar11082109 ng-hide" ng-show="boxStyle.toggleStyleText"
                            ng-include="includePath.toolbar" click-outside="" outside-if-not="">
                            <div class="field cf ng-scope">

                            </div>
                        </div>
                    </div>
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
            style="padding: 5px 0px; text-align: center; line-height: 1.8; border-style: solid; border-width: 0px;">
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
                            <a href="${resetPasswordLink}" ng-style="boxStyle.button" target="_blank" contenteditable="true"
                                ng-paste="toolbar.pasteCta(boxContent,$event);" ng-keypress="preventBreak($event);"
                                ng-keydown="preventBreak($event);mergeTagInsert($event)" ng-model="boxContent.buttonText"
                                ng-class="{'btnLinkToggleOn':boxStyle.toggleStyle}"
                                class="cta ng-pristine ng-untouched ng-valid ng-not-empty"
                                style="font-size: 16px; color: rgb(255, 255, 255); display: inline-block; background: rgb(22, 203, 250); border-radius: 50px; border-style: solid; border-width: 0px; border-color: rgb(58, 121, 227); padding: 14px 20px 11px; text-decoration: none; outline: 0px; font-family: AppleSDGothic, &quot;apple sd gothic neo&quot;, &quot;noto sans korean&quot;, &quot;noto sans korean regular&quot;, &quot;noto sans cjk kr&quot;, &quot;noto sans cjk&quot;, &quot;nanum gothic&quot;, &quot;malgun gothic&quot;, dotum, arial, helvetica, sans-serif; text-align: center;">비밀번호
                                초기화</a>
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
    `;
}