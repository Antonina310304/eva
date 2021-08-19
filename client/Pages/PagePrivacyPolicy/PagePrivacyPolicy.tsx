import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PagePrivacyPolicy.module.css';

export interface PagePrivacyPolicyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PagePrivacyPolicy: FC<PagePrivacyPolicyProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Политика конфиденциальности</h1>
        <div className={styles.subTitle}>
          Настоящая Политика конфиденциальности персональных данных (далее – Политика
          конфиденциальности) действует в отношении всей информации, которую Интернет-магазин
          «Divan.ru», расположенный на доменном имени www.divan.ru, может получить о Пользователе во
          время использования сайта Интернет-магазина, программ и продуктов Интернет-магазина.
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>1.ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</div>
          <div className={styles.infoSection_content}>
            <p>1.1. В настоящей Политике конфиденциальности используются следующие термины:</p>
            <p>
              1.1.1. «Администрация сайта Интернет-магазина» (далее – Администрация сайта) –
              уполномоченные сотрудники на управление сайтом, действующие от имени Интернет-магазина
              «Divan.ru», которые организуют и осуществляют обработку персональных данных, а также
              определяют цели обработки персональных данных, состав персональных данных, подлежащих
              обработке, действия (операции), совершаемые с персональными данными.
            </p>
            <p>
              1.1.2. «Персональные данные» – любая информация, относящаяся к прямо или косвенно
              определенному или определяемому физическому лицу (субъекту персональных данных).
            </p>
            <p>
              1.1.3. «Обработка персональных данных» – любое действие (операция) или совокупность
              действий (операций), совершаемых с использованием средств автоматизации или без
              использования таких средств с персональными данными, включая сбор, запись,
              систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение,
              использование, передачу (распространение, предоставление доступа), обезличивание,
              блокирование, удаление, уничтожение персональных данных.
            </p>
            <p>
              1.1.4. «Конфиденциальность персональных данных» – обязательное для соблюдения
              Оператором или иным получившим доступ к персональным данным лицом требование не
              допускать их распространения без согласия субъекта персональных данных или наличия
              иного законного основания.
            </p>
            <p>
              1.1.5. «Пользователь сайта Интернет-магазина (далее – Пользователь)» – лицо, имеющее
              доступ к Сайту, посредством сети Интернет и использующее Сайт интернет-магазина.
            </p>
            <p>
              1.1.6. «Cookies» – небольшой фрагмент данных, отправленный веб-сервером и хранимый на
              компьютере пользователя, который веб-клиент или веб-браузер каждый раз пересылает
              веб-серверу в HTTP-запросе при попытке открыть страницу соответствующего сайта.
            </p>
            <p>
              1.1.7. «IP-адрес» – уникальный сетевой адрес узла в компьютерной сети, построенной по
              протоколу IP.
            </p>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>2. ОБЩИЕ ПОЛОЖЕНИЯ</div>
          <div className={styles.infoSection_content}>
            <p>
              2.1. Использование Пользователем сайта Интернет-магазина означает согласие с настоящей
              Политикой конфиденциальности и условиями обработки персональных данных Пользователя.
            </p>
            <p>
              2.2. В случае несогласия с условиями Политики конфиденциальности Пользователь должен
              прекратить использование сайта Интернет-магазина.
            </p>
            <p>
              2.3. Настоящая Политика конфиденциальности применяется только к сайту
              Интернет-магазина «Divan.ru». Интернет-магазин не контролирует и не несет
              ответственность за сайты третьих лиц, на которые Пользователь может перейти по
              ссылкам, доступным на сайте Интернет-магазина.
            </p>
            <p>
              2.4. Администрация сайта не проверяет достоверность персональных данных,
              предоставляемых Пользователем сайта Интернет-магазина.
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>3.ПРЕДМЕТ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ</div>
          <div className={styles.infoSection_content}>
            <p>
              3.1. Настоящая Политика Конфиденциальности устанавливает обязательства Администрации
              сайта интернет-магазина по неразглашению и обеспечению режима защиты
              конфиденциальности персональных данных, которые Пользователь предоставляет по запросу
              Администрации сайта при регистрации на сайте интернет-магазина или при оформлении
              заказа для приобретения Товара.
            </p>
            <p>
              3.2. Персональные данные, разрешённые к обработке в рамках настоящей Политики
              Конфиденциальности, предоставляются Пользователем путём заполнения регистрационной
              формы на Сайте интернет-магазина «divan.ru» и включают в себя следующую информацию:
            </p>
            <p>3.2.1. Фамилию, имя, отчество Пользователя;</p>
            <p>3.2.2. Контактный телефон Пользователя;</p>
            <p>3.2.3. Адрес электронной почты (e-mail);</p>
            <p>3.2.4. Адрес доставки Товара;</p>
            <p>3.2.5. Место жительство Пользователя.</p>
            <p>
              3.3. Интернет-магазин защищает Данные, которые автоматически передаются в процессе
              просмотра рекламных блоков и при посещении страниц, на которых установлен
              статистический скрипт системы (&quot;пиксель&quot;):
            </p>
            <p>• IP адрес;</p>
            <p>• информация из cookies;</p>
            <p>
              • информация о браузере (или иной программе, которая осуществляет доступ к показу
              рекламы);
            </p>
            <p>• время доступа;</p>
            <p>• адрес страницы, на которой расположен рекламный блок;</p>
            <p>• реферер (адрес предыдущей страницы).</p>
            <p>
              3.3.1. Отключение cookies может повлечь невозможность доступа к частям сайта
              Интернет-магазина, требующим авторизации.
            </p>
            <p>
              3.3.2. Интернет-магазин осуществляет сбор статистики об IP-адресах своих посетителей.
              Данная информация используется с целью выявления и решения технических проблем, для
              контроля законности проводимых финансовых платежей.
            </p>
            <p>
              3.4. Любая иная персональная информация неоговоренная выше (история покупок,
              используемые браузеры и операционные системы и т.д.) подлежит надежному хранению и
              нераспространению, за исключением случаев, предусмотренных в п.п. 5.2. и 5.3.
              настоящей Политики Конфиденциальности.
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>
            4.ЦЕЛИ СБОРА ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
          </div>
          <div className={styles.infoSection_content}>
            <p>
              4.1. Персональные данные Пользователя Администрация сайта интернет-магазина может
              использовать в целях:
            </p>

            <p>
              4.1.1. Идентификации Пользователя, зарегистрированного на сайте Интернет-магазина, для
              оформления заказа и (или) заключения Договора купли-продажи товара дистанционным
              способом с «divan.ru».
            </p>

            <p>
              4.1.2. Предоставления Пользователю доступа к персонализированным ресурсам Сайта
              интернет-магазина.
            </p>

            <p>
              4.1.3. Установления с Пользователем обратной связи, включая направление уведомлений,
              запросов, касающихся использования Сайта интернет-магазина, оказания услуг, обработка
              запросов и заявок от Пользователя.
            </p>

            <p>
              4.1.4. Определения места нахождения Пользователя для обеспечения безопасности,
              предотвращения мошенничества.
            </p>
            <p>
              4.1.5. Подтверждения достоверности и полноты персональных данных, предоставленных
              Пользователем.
            </p>

            <p>
              4.1.6. Создания учетной записи для совершения покупок, если Пользователь дал согласие
              на создание учетной записи.
            </p>

            <p>4.1.7. Уведомления Пользователя Сайта интернет-магазина о состоянии Заказа.</p>

            <p>
              4.1.8. Обработки и получения платежей, подтверждения налога или налоговых льгот,
              оспаривания платежа, определения права на получение кредитной линии Пользователем.
            </p>

            <p>
              4.1.9. Предоставления Пользователю эффективной клиентской и технической поддержки при
              возникновении проблем связанных с использованием Сайта интернет-магазина.
            </p>
            <p>
              4.1.10. Предоставления Пользователю с его согласия, обновлений продукции, специальных
              предложений, информации о ценах, новостной рассылки и иных сведений от имени
              Интернет-магазина или от имени партнеров Интернет-магазина.
            </p>

            <p>4.1.11. Осуществления рекламной деятельности с согласия Пользователя.</p>

            <p>
              4.1.12. Предоставления доступа Пользователю на сайты или сервисы партнеров
              Интернет-магазина с целью получения продуктов, обновлений и услуг.
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>
            5.СПОСОБЫ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ
          </div>
          <div className={styles.infoSection_content}>
            <p>
              5.1. Обработка персональных данных Пользователя осуществляется без ограничения срока,
              любым законным способом, в том числе в информационных системах персональных данных с
              использованием средств автоматизации или без использования таких средств.
            </p>
            <p>
              5.2. Пользователь соглашается с тем, что Администрация сайта вправе передавать
              персональные данные третьим лицам, в частности, курьерским службам, организациям
              почтовой связи, операторам электросвязи, исключительно в целях выполнения заказа
              Пользователя, оформленного на Сайте интернет-магазина «divan.ru», включая доставку
              Товара.
            </p>
            <p>
              5.3. Персональные данные Пользователя могут быть переданы уполномоченным органам
              государственной власти Российской Федерации только по основаниям и в порядке,
              установленным законодательством Российской Федерации.
            </p>
            <p>
              5.4. При утрате или разглашении персональных данных Администрация сайта информирует
              Пользователя об утрате или разглашении персональных данных.
            </p>
            <p>
              5.5. Администрация сайта принимает необходимые организационные и технические меры для
              защиты персональной информации Пользователя от неправомерного или случайного доступа,
              уничтожения, изменения, блокирования, копирования, распространения, а также от иных
              неправомерных действий третьих лиц.
            </p>
            <p>
              5.6. Администрация сайта совместно с Пользователем принимает все необходимые меры по
              предотвращению убытков или иных отрицательных последствий, вызванных утратой или
              разглашением персональных данных Пользователя.
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>6.ОБЯЗАТЕЛЬСТВА СТОРОН</div>
          <div className={styles.infoSection_content}>
            <p>
              6.1.1. Предоставить информацию о персональных данных, необходимую для пользования
              Сайтом интернет-магазина.
            </p>

            <p>
              6.1.2. Обновить, дополнить предоставленную информацию о персональных данных в случае
              изменения данной информации.
            </p>

            <p>6.2. Администрация сайта обязана:</p>

            <p>
              6.2.1. Использовать полученную информацию исключительно для целей, указанных в п. 4
              настоящей Политики Конфиденциальности.
            </p>

            <p>
              6.2.2. Обеспечить хранение конфиденциальной информации в тайне, не разглашать без
              предварительного письменного разрешения Пользователя, а также не осуществлять продажу,
              обмен, опубликование, либо разглашение иными возможными способами переданных
              персональных данных Пользователя, за исключением п.п. 5.2. и 5.3. настоящей Политики
              Конфиденциальности.
            </p>
            <p>
              6.2.3. Принимать меры предосторожности для защиты конфиденциальности персональных
              данных Пользователя согласно порядку, обычно используемого для защиты такого рода
              информации в существующем деловом обороте.
            </p>
            <p>
              6.2.4. Осуществить блокирование персональных данных, относящихся к соответствующему
              Пользователю, с момента обращения или запроса Пользователя или его законного
              представителя либо уполномоченного органа по защите прав субъектов персональных данных
              на период проверки, в случае выявления недостоверных персональных данных или
              неправомерных действий.
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>7.ОТВЕТСТВЕННОСТЬ СТОРОН</div>
          <div className={styles.infoSection_content}>
            <p>
              7.1. Администрация сайта, не исполнившая свои обязательства, несёт ответственность за
              убытки, понесённые Пользователем в связи с неправомерным использованием персональных
              данных, в соответствии с законодательством Российской Федерации, за исключением
              случаев, предусмотренных п.п. 5.2., 5.3. и 7.2. настоящей Политики Конфиденциальности.
            </p>

            <p>
              7.2. В случае утраты или разглашения конфиденциальной информации Администрация сайта
              не несёт ответственность, если данная конфиденциальная информация:
            </p>

            <p>7.2.1. Стала публичным достоянием до её утраты или разглашения.</p>

            <p>
              7.2.2. Была получена от третьей стороны до момента её получения Администрацией сайта.
            </p>

            <p>7.2.3. Была разглашена с согласия Пользователя.</p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>8.РАЗРЕШЕНИЕ СПОРОВ</div>
          <div className={styles.infoSection_content}>
            <p>
              8.1. До обращения в суд с иском по спорам, возникающим из отношений между
              Пользователем сайта Интернет-магазина и Администрацией сайта, обязательным является
              предъявление претензии (письменного предложения о добровольном урегулировании спора).
            </p>

            <p>
              8.2. Получатель претензии в течение 30 календарных дней со дня получения претензии,
              письменно уведомляет заявителя претензии о результатах рассмотрения претензии.
            </p>

            <p>
              8.3. При не достижении соглашения спор будет передан на рассмотрение в судебный орган
              в соответствии с действующим законодательством Российской Федерации.
            </p>

            <p>
              8.4. К настоящей Политике Конфиденциальности и отношениям между Пользователем и
              Администрацией сайта применяется действующее законодательство Российской Федерации.
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSection_title}>9.ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</div>
          <div className={styles.infoSection_content}>
            <p>
              9.1. Администрация сайта вправе вносить изменения в настоящую Политику
              Конфиденциальности без согласия Пользователя.
            </p>

            <p>
              9.2. Новая Политика Конфиденциальности вступает в силу с момента ее размещения на
              Сайте интернет-магазина, если иное не предусмотрено новой редакцией Политики
              Конфиденциальности.
            </p>

            <p>
              9.3. Все предложения или вопросы по настоящей Политике Конфиденциальности следует
              сообщать в службу клиентской поддержки интернет-магазина.
            </p>

            <p>
              9.4. Действующая Политика Конфиденциальности размещена на странице по адресу
              www.divan.ru/static-page/privacy-policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PagePrivacyPolicy);
