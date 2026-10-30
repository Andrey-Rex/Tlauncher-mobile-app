import { useState } from 'react'

type Screen =
  | 'home'
  | 'profiles'
  | 'profile-edit'
  | 'accounts'
  | 'account-detail'
  | 'add-account'
  | 'microsoft'
  | 'local'
  | 'create-profile'
  | 'versions'
  | 'packs'
  | 'import'
  | 'settings'
  | 'other-settings'
  | 'java-settings'
  | 'runtimes'

type Navigate = (screen: Screen) => void

const asset = (name: string) => `/assets/${name}`

function Icon({ file, className = '' }: { file: string; className?: string }) {
  return <img alt="" className={className} src={asset(file)} />
}

function BackHeader({
  title,
  back,
}: {
  title: string
  back: () => void
}) {
  return (
    <header className="screen-header">
      <button aria-label="Назад" className="back-button" onClick={back} type="button">
        <Icon file="1769f.svg" />
      </button>
      <h1>{title}</h1>
    </header>
  )
}

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">TL</span>
      <span className="brand-name">TLauncher</span>
    </div>
  )
}

function More() {
  return (
    <span className="more-icon" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

function BottomNav({ active, go }: { active: 'home' | 'accounts' | 'settings'; go: Navigate }) {
  return (
    <nav className="tab-bar prototype-tabs" aria-label="Основная навигация">
      <button
        className={`tab ${active === 'home' ? 'is-active' : ''}`}
        onClick={() => go('home')}
        type="button"
      >
        <Icon file={active === 'home' ? 'c9634.svg' : 'ebe3f.svg'} className="icon-24" />
        <span>Главная</span>
      </button>
      <button
        className={`tab ${active === 'accounts' ? 'is-active' : ''}`}
        onClick={() => go('accounts')}
        type="button"
      >
        <Icon file={active === 'accounts' ? 'b94ed.svg' : 'd8fe7.svg'} className="icon-24" />
        <span>Аккаунты</span>
      </button>
      <button
        className={`tab ${active === 'settings' ? 'is-active' : ''}`}
        onClick={() => go('settings')}
        type="button"
      >
        <Icon file={active === 'settings' ? '987cc.svg' : 'ca4e4.svg'} className="icon-24" />
        <span>Настройки</span>
      </button>
    </nav>
  )
}

const profiles = [
  '[Default] / Minecraft 1.17.10',
  'Fabric 1.21.10',
  'Forge 1.20.1',
  'RedstoneWiz / 1.17.10',
  'PixelWolf_ / 1.17.10',
]

function Home({ go }: { go: Navigate }) {
  const [launching, setLaunching] = useState(false)

  return (
    <>
      <div className="screen-content home-content">
        <section className="brand-banner">
          <Icon file="1e8b1.png" className="brand-banner-image" />
          <div className="brand-banner-shade" />
          <div className="brand-banner-copy">
            <div className="new-brand">
              <Icon file="0d00b.svg" className="brand-cube" />
              <div>
                <div className="new-brand-title">TLauncher<span>.</span></div>
                <small>MOBILE</small>
              </div>
            </div>
            <p>Лаунчер для Minecraft с удобным управлением и множеством версий</p>
          </div>
        </section>
        <button className="account-card" onClick={() => go('accounts')} type="button">
          <span className="avatar">
            <Icon file="78099.svg" className="avatar-image" />
          </span>
          <span className="card-copy">
            <span className="card-title">DarkViper</span>
            <span className="card-subtitle active-copy">Активный аккаунт</span>
          </span>
          <Icon file="b47fa.svg" className="icon-24" />
        </button>

        <div className="profiles-heading">
          <h2>Профили</h2>
          <span>3 профиля</span>
        </div>
        <div className="launcher-card">
          <button className="add-profile" onClick={() => go('create-profile')} type="button">
            <span className="icon-box">
              <Icon file="6e84f.svg" className="icon-24" />
            </span>
            <span>Добавить профиль</span>
          </button>
          <div className="profile-list">
            {profiles.slice(0, 3).map((profile, index) => (
              <div className={`version-card ${index ? 'profile-row' : ''}`} key={profile}>
                <span className="game-icon">
                  <Icon file="78099.svg" className="icon-24" />
                </span>
                <span className="card-copy">
                  <span className="card-title">{profile}</span>
                  <span className="card-subtitle">
                    {index ? 'Локальный аккаунт' : 'Активный аккаунт'}
                  </span>
                </span>
                <button
                  aria-label="Редактировать профиль"
                  className="square-action"
                  onClick={() => go('profile-edit')}
                  type="button"
                >
                  <More />
                </button>
                {!index && (
                  <button
                    aria-expanded="true"
                    aria-label="Показать профили"
                    className="square-action"
                    onClick={() => go('profile-edit')}
                    type="button"
                  >
                    <Icon file="20418.svg" className="icon-24 chevron chevron-open" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className={`play-frame new-play ${launching ? 'is-launching' : ''}`}
        disabled={launching}
        onClick={() => {
          setLaunching(true)
          window.setTimeout(() => setLaunching(false), 1400)
        }}
        type="button"
      >
        <span>
          <Icon file="d4ee6.svg" className="play-button-icon" />
          <b>{launching ? 'Запуск...' : 'Играть'}</b>
        </span>
      </button>
      <BottomNav active="home" go={go} />
    </>
  )
}

const accountData = [
  ['78099.svg', 'DarkViper', 'Активный аккаунт'],
  ['78099.svg', 'Starlight', 'Локальный аккаунт'],
  ['78099.svg', 'Shadow_Hunter', 'Локальный аккаунт'],
  ['78099.svg', 'RedStoneMaster', 'Локальный аккаунт'],
  ['78099.svg', 'CreeperHunter', 'Локальный аккаунт'],
]

function Accounts({ go }: { go: Navigate }) {
  return (
    <>
      <div className="screen-content accounts-content">
        <div className="section-intro">
          <Icon file="9e87e.svg" className="intro-icon" />
          <div>
            <h1 className="pixel-title">Аккаунты</h1>
            <p>Управляйте игровыми аккаунтами</p>
          </div>
        </div>
        <div className="accounts-list">
          {accountData.map(([image, name, caption], index) => (
            <button
              className={`account-row ${index === 0 ? 'selected' : ''}`}
              key={name}
              onClick={() => go('account-detail')}
              type="button"
            >
              <Icon file={image} className="account-avatar" />
              <span className="card-copy">
                <span className="card-title">{name}</span>
                <span className="card-subtitle">{caption}</span>
              </span>
              <span className="square-action">
                <More />
              </span>
            </button>
          ))}
        </div>
      </div>
      <button className="brand-button bottom-action" onClick={() => go('add-account')} type="button">
        <Icon file="38625.svg" className="icon-24" />
        Добавить аккаунт
      </button>
      <BottomNav active="accounts" go={go} />
    </>
  )
}

function AddAccount({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Добавить аккаунт" back={() => go('accounts')} />
      <div className="center-actions">
        <button className="outline-button" onClick={() => go('microsoft')} type="button">
          <Icon file="8a6cc.svg" className="icon-24" />
          Войти через Microsoft
        </button>
        <button className="outline-button" onClick={() => go('local')} type="button">
          <Icon file="c8c13.svg" className="icon-24" />
          Добавить локальный аккаунт
        </button>
      </div>
    </div>
  )
}

function Microsoft({ go }: { go: Navigate }) {
  const [email, setEmail] = useState('')
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Добавить аккаунт" back={() => go('add-account')} />
      <div className="microsoft-form">
        <div className="microsoft-brand">
          <Icon file="78aed.svg" className="microsoft-icon" />
          <span>Microsoft</span>
        </div>
        <h2 className="pixel-title login-title">Войти</h2>
        <p>Для перехода в Minecraft</p>
        <label>
          Адрес электронной почты или номер телефона
          <input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="mail@gmail.com"
            value={email}
          />
        </label>
        <button className="text-link" type="button">
          Забыли свое имя пользователя?
        </button>
        <button
          className="brand-button"
          disabled={!email}
          onClick={() => go('accounts')}
          type="button"
        >
          Далее
        </button>
        <p className="form-note">
          Раньше не взаимодействовали с Корпорацией Microsoft?{' '}
          <strong>Создать учетную запись</strong>
        </p>
        <Icon file="15340.png" className="minecraft-logo" />
      </div>
    </div>
  )
}

function LocalAccount({ go }: { go: Navigate }) {
  const [name, setName] = useState('mail@gmail.com')
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Добавить локальный аккаунт" back={() => go('add-account')} />
      <div className="form-stack">
        <label>
          Имя пользователя
          <input onChange={(event) => setName(event.target.value)} value={name} />
        </label>
        <button className="brand-button" onClick={() => go('accounts')} type="button">
          Войти
        </button>
      </div>
    </div>
  )
}

function ProfileEdit({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen scroll-screen">
      <BackHeader title="DarkViper" back={() => go('home')} />
      <div className="profile-cube">
        <Icon file="78099.svg" />
      </div>
      <div className="form-stack profile-form">
        <label>Имя<input defaultValue="PixelWolf_" /></label>
        <SelectRow label="Версия" value="latest release" />
        <SelectRow label="Раскладка управления" value="[как везде]" />
        <label>Аргументы JVM<input defaultValue="[как везде]" /></label>
        <SelectRow label="Custom path" value=".minecraft" />
        <SelectRow label="Среда выполнения Java" value="<Default>" />
        <SelectRow label="Визуализатор" value="По умолчанию" />
        <div className="button-pair">
          <button className="outline-button" onClick={() => go('home')} type="button">Отменить</button>
          <button className="brand-button" onClick={() => go('home')} type="button">Сохранить</button>
        </div>
      </div>
    </div>
  )
}

function SelectRow({ label, value }: { label: string; value: string }) {
  return (
    <label className="select-row">
      {label}
      <span>{value}<Icon file="4d08e.svg" className="icon-24" /></span>
    </label>
  )
}

const creationOptions: Array<[string, string, string, Screen]> = [
  ['4ebb9.svg', 'Играть без модов', 'Выберите версию Minecraft и установите её.', 'versions'],
  ['1e54f.svg', 'Играть с модами', 'Установите Fabric, Forge или другой загрузчик модов.', 'versions'],
  ['e8785.svg', 'Выбрать готовую сборку', 'Найдите сборку с модами и настройками в каталоге.', 'packs'],
  ['80900.svg', 'Импортировать сборку', 'Загрузите сборку из файла ZIP или MRPACK.', 'import'],
]

function CreateProfile({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen">
      <BackHeader title="" back={() => go('home')} />
      <div className="creation-intro">
        <div>
          <h1 className="pixel-title">Создание профиля</h1>
          <p>Выберите, как хотите подготовить Minecraft к запуску.</p>
          <small>Создайте профиль определённого типа, выберите модпак или импортируйте архив.</small>
        </div>
      </div>
      <div className="option-list">
        {creationOptions.map(([icon, title, copy, target]) => (
          <button className="option-card" key={title} onClick={() => go(target)} type="button">
            <span className="outlined-icon"><Icon file={icon} className="icon-24" /></span>
            <span><strong>{title}</strong><small>{copy}</small></span>
            <span className="option-arrow"><Icon file="f4ee5.svg" className="icon-24" /></span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Versions({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Создание профиля" back={() => go('create-profile')} />
      <div className="creation-intro compact">
        <Icon file="be079.svg" className="icon-32" />
        <div><h1 className="pixel-title">Играть без модов</h1><p>Выберите версию Minecraft.</p></div>
      </div>
      <div className="version-sheet">
        <h2>Выберите версию</h2>
        <p>Установлено</p>
        {['1.26.234', '1.21.11', '21.10.9', '21.10.8', '21.10.7'].map((version, index) => (
          <button className="sheet-row" key={version} type="button">
            {version}{index === 0 && <span className="check">✓</span>}
          </button>
        ))}
        <button className="brand-button" onClick={() => go('home')} type="button">Применить</button>
      </div>
    </div>
  )
}

function Packs({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen scroll-screen">
      <BackHeader title="Выбрать готовую сборку" back={() => go('create-profile')} />
      <input className="search-field" placeholder="Название сборки" />
      <div className="chips"><span>Все</span><span>Выживание</span><span>Технологии</span><span>Приключения</span></div>
      {[1, 2, 3, 4].map((item) => (
        <article className="pack-card" key={item}>
          <Icon file="80c67.svg" className="pack-icon" />
          <h2>Сказочно оптимизирован</h2>
          <small>Автор: w4_p123</small>
          <button aria-label="Скачать сборку" className="pack-download" type="button">
            <Icon file="68eb1.svg" className="icon-24" />
          </button>
          <p>Прекрасная графика, высокая производительность и привычные функции в простом интерфейсе.</p>
          <button className="pack-details" onClick={() => go('home')} type="button">Подробнее</button>
        </article>
      ))}
    </div>
  )
}

function ImportPack({ go }: { go: Navigate }) {
  const [file, setFile] = useState('')
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Импортировать сборку" back={() => go('create-profile')} />
      <div className="import-copy">
        <Icon file="d6026.svg" className="icon-32" />
        <div>
          <h1 className="pixel-title">{file || 'Файл не выбран'}</h1>
          <p>Выберите файл сборки в формате ZIP или MRPACK.</p>
          <small>После выбора файла покажем его название и проверим формат.</small>
        </div>
      </div>
      <label className="brand-button file-button">
        Выбрать файл <Icon file="2067f.svg" className="icon-24" />
        <input
          accept=".zip,.mrpack"
          onChange={(event) => setFile(event.target.files?.[0]?.name ?? '')}
          type="file"
        />
      </label>
    </div>
  )
}

const settingsOptions: Array<[string, string, string, Screen]> = [
  ['be079.svg', 'Все настройки', '', 'java-settings'],
  ['be079.svg', 'Пользовательское управление', '', 'other-settings'],
  ['ed3c3.svg', 'Открыть папку игры', 'Найдите сборку с модами и настройками в каталоге.', 'settings'],
  ['be079.svg', 'Запустить .jar', '', 'java-settings'],
  ['b47a9.svg', 'Поделиться журналом', '', 'settings'],
]

function Settings({ go }: { go: Navigate }) {
  return (
    <>
      <div className="screen-content settings-content">
        <div className="option-list">
          {settingsOptions.map(([icon, title, copy, target]) => (
            <button className="option-card" key={title} onClick={() => go(target)} type="button">
              <span className="outlined-icon"><Icon file={icon} className="icon-24" /></span>
              <span><strong>{title}</strong>{copy && <small>{copy}</small>}</span>
              <span className="option-arrow"><Icon file="f4ee5.svg" className="icon-24" /></span>
            </button>
          ))}
        </div>
      </div>
      <BottomNav active="settings" go={go} />
    </>
  )
}

function ToggleCard({
  title,
  copy,
  initial = false,
}: {
  title: string
  copy: string
  initial?: boolean
}) {
  const [checked, setChecked] = useState(initial)
  return (
    <button className="setting-card" onClick={() => setChecked(!checked)} type="button">
      <span><strong>{title}</strong><small>{copy}</small></span>
      <span className={`toggle ${checked ? 'on' : ''}`}><i /></span>
    </button>
  )
}

function OtherSettings({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Другие настройки" back={() => go('settings')} />
      <div className="settings-stack">
        <ToggleCard initial title="Проверка библиотек после загрузки" copy="Принуждает лаунчер проверять хеш библиотек, если он доступен." />
        <ToggleCard title="Плащи Cosmetica" copy="Включает плащи от Cosmetica. Требуется OptiFine." />
        <ToggleCard title="Источник загрузки файлов игры" copy="По умолчанию" />
        <ToggleCard initial title="Проверка метаданных версии" copy="Проверять манифест версии игры совместно с библиотеками." />
      </div>
    </div>
  )
}

function JavaSettings({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Настройки Java" back={() => go('settings')} />
      <div className="settings-stack">
        <button className="setting-card" onClick={() => go('runtimes')} type="button"><span><strong>Менеджер среды выполнения</strong><small>Управление установленными средами выполнения Java.</small></span></button>
        <button className="setting-card" type="button"><span><strong>Аргументы запуска JVM</strong><small>Осторожно, необдуманное изменение может привести к сбою игры.</small></span></button>
        <div className="setting-card memory"><span><strong>Выделение памяти</strong><small>Управление объёмом выделяемой игре памяти.</small><input aria-label="Память" defaultValue="936" max="4096" min="512" type="range" /></span></div>
        <ToggleCard title="Disable automatic JRE selection" copy="Stops automatic selection of which runtime to use in Запустить .jar" />
        <ToggleCard initial title="Безопасное выполнение .jar" copy="Управляет доступностью менеджера безопасной среды Java." />
      </div>
    </div>
  )
}

function Runtimes({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen dimmed">
      <BackHeader title="Настройки Java" back={() => go('java-settings')} />
      <div className="runtime-sheet">
        <h2>Среды выполнения Java</h2>
        {[
          ['External 8', '1.8.0_92', 'По умолчанию'],
          ['External 21', '21.0.1', 'Выбрать'],
          ['External 17', 'Not Installed', 'Установить'],
          ['External 25', 'Not Installed', 'Установить'],
        ].map(([name, version, action], index) => (
          <button className="runtime-row" key={name} type="button">
            <span>{name}<small>{version}</small></span>
            <b>{index === 0 ? '✓' : action}</b>
          </button>
        ))}
        <div className="button-pair">
          <button className="outline-button" type="button">Удалить</button>
          <button className="brand-button" onClick={() => go('java-settings')} type="button">Добавить новую</button>
        </div>
      </div>
    </div>
  )
}

function AccountDetail({ go }: { go: Navigate }) {
  return (
    <div className="screen-content full-screen">
      <BackHeader title="Аккаунт" back={() => go('accounts')} />
      <div className="account-detail">
        <Icon file="78099.svg" className="detail-avatar" />
        <h1>DarkViper</h1>
        <p>Локальный аккаунт</p>
        <button className="outline-button" onClick={() => go('accounts')} type="button">
          <Icon file="97d99.svg" className="icon-24" /> Сделать главным
        </button>
        <button className="outline-button" onClick={() => go('profile-edit')} type="button">
          <Icon file="ad14b.svg" className="icon-24" /> Редактировать
        </button>
        <button className="danger-button" onClick={() => go('accounts')} type="button">
          <Icon file="ef2ae.svg" className="icon-24" /> Удалить аккаунт
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const go: Navigate = (next) => {
    setScreen(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const screens: Record<Screen, React.ReactNode> = {
    home: <Home go={go} />,
    profiles: <Home go={go} />,
    'profile-edit': <ProfileEdit go={go} />,
    accounts: <Accounts go={go} />,
    'account-detail': <AccountDetail go={go} />,
    'add-account': <AddAccount go={go} />,
    microsoft: <Microsoft go={go} />,
    local: <LocalAccount go={go} />,
    'create-profile': <CreateProfile go={go} />,
    versions: <Versions go={go} />,
    packs: <Packs go={go} />,
    import: <ImportPack go={go} />,
    settings: <Settings go={go} />,
    'other-settings': <OtherSettings go={go} />,
    'java-settings': <JavaSettings go={go} />,
    runtimes: <Runtimes go={go} />,
  }

  return <main className="prototype-shell">{screens[screen]}</main>
}
