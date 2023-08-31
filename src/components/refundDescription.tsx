import { component$ } from "@builder.io/qwik";
import Collapse from "./collapse";

export default component$(() => {
  return (
    <>
      <h4 class="text-2xl my-4">►退換貨/瑕疵書/退款說明</h4>
      <div class="join join-vertical w-full">
        <Collapse styles="join-item" title="♦一般商品退換貨♦">
          <div q:slot="content" class="flex flex-col gap-1">
            <p>
              ※基地文化出版有限公司的書籍寄出後，原則上僅接受退書，不接受換書服務。
            </p>
            <p>
              ※為了保障您的權益，您於故事商城所購買商品享有到貨七天的鑑賞期（含例假日）。
            </p>
            <p>
              ※若非本公司商品之問題，不接受換貨，若需要退貨運費將由買方自行吸收，並自行寄回。
            </p>
            <p>
              ※商品本身另有包裝、且標示「拆封不退」者，一經拆封恕不退貨。※請留意，鑑賞期非試用期，請您在訂購商品前或收到商品後，對該商品有任何疑慮，或需要更進一步了解商品的內容或使用方式，請先來電03-8315502與客服人員連絡。
            </p>
            <p>
              ※退貨必須是全新狀態(不可簽名、註記...等)、完整包裝(商品、附件、內外包裝、隨貨文件、贈品等)與發票，否則恕不接受退貨。
            </p>
            <p>
              ※買家訂購後若大量退換貨，由於已造成作業上之困擾，故將可視情況採取取消訂單交易。
            </p>
          </div>
        </Collapse>
        <Collapse styles="join-item" title="♦瑕疵書換貨/退貨♦">
          <div q:slot="content" class="flex flex-col gap-1">
            <p>
              ※在您收到商品的七天之內（含例假日，以郵戳或宅配公司送達日為憑），如發現商品有瑕疵或無法正常使用時，請來信或來電03-8315502與客服人員告知相關需求。
            </p>
            <p>
              ※若買家未告知要退貨書籍，自行寄回退貨書籍，若商品遺失或有損壞，基地文化出版有限公司將不負擔相關損失責任。
            </p>
          </div>
        </Collapse>
        <Collapse styles="join-item" title="♦郵資運費問題♦">
          <div q:slot="content" class="flex flex-col gap-1">
            <p>※瑕疵退貨:本公司負擔運費</p>
            <p>※非瑕疵退貨:請買家自行負擔運費</p>
          </div>
        </Collapse>
        <Collapse styles="join-item" title="♦訂單退款說明♦">
          <div q:slot="content" class="flex flex-col gap-1">
            <p>※當以下訂單狀況發生時，將為您辦理訂單退款作業：</p>
            <p>1.訂單已付款未出貨，取消訂單。</p>
            <p>2.您的訂單訂購商品已缺貨絕版、或等待再版無法立即供貨時。</p>
            <p>3.商品瑕疵退貨不換貨。</p>
            <p>4.商品於到貨七天的鑑賞期（含例假日）內辦理退貨。</p>
          </div>
        </Collapse>
        <Collapse styles="join-item" title="♦退貨/退款同意書♦">
          <div q:slot="content" class="flex flex-col gap-1">
            <p>
              ※請來電03-8315502與客服人員聯繫，或私訊基地文化臉書專頁收到訊息後將為您處理。
            </p>
          </div>
        </Collapse>
      </div>
    </>
  );
});
